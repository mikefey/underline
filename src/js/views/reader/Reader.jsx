import React, { Component } from 'react';
import Header from 'ui/header/Header.jsx';
import BackButton from 'ui/back-button/BackButton.jsx';
import stringHelper from 'libs/string/string-helper';
import deviceHelper from 'libs/device/device-helper';
import PlaceholderPage from './PlaceholderPage.jsx';
import OpenTOCButton from './OpenTOCButton.jsx';
import ArrowButton from './ArrowButton.jsx';
import LocationSlider from './LocationSlider.jsx';
import pageStyle from './page-style';
import style from './Reader.scss';


/**
 * Reader view component
 */
class Reader extends Component {
  constructor(props) {
    super(props);

    this.dragging = false;
    this.resetting = false;
    this.transitioning = false;
    this.dragThreshold = 10;
    this.dragStartPos = 0;
    this.contentStartPos = 0;
    this.rendition = null;
    this.initialLoad = true;
    this.horizontalPagePadding = 20;
    this.resizeTimeout = 0;
    this.navigationDirection = 'jump';
    this.atBeginningOrEnd = false;

    this.onSliderReleased = this.onSliderReleased.bind(this);
    this.loadBook = this.loadBook.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.onBookLocationChange = this.onBookLocationChange.bind(this);
    this.parseAndRenderBook = this.parseAndRenderBook.bind(this);
    this.onInitialRender = this.onInitialRender.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.transitionToNewPage = this.transitionToNewPage.bind(this);
    this.updateTableOfContents = this.updateTableOfContents.bind(this);
    this.updatePositionData = this.updatePositionData.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderLocationSlider = this.renderLocationSlider.bind(this);
    this.onPageRenderComplete = this.onPageRenderComplete.bind(this);

    this.state = {
      contentPosition: 0,
    };
  }


  /**
   * Loads current book when the component mounts
   * @returns {undefine} undefined
   */
  componentDidMount() {
    const readerState = this.props.readerState;

    if (readerState.dbReady) {
      this.loadBook();
    }

    this.touchSupport = ('ontouchstart' in window || window.DocumentTouch);
    this.mouseDownHandler = !this.touchSupport ? this.onTouchStart : null;
    this.touchStartHandler = this.touchSupport ? this.onTouchStart : null;
    this.touchMoveHandler = this.touchSupport ? this.onTouchMove : null;
    this.touchEndHandler = this.touchSupport ? this.onTouchEnd : null;

    if (!this.touchSupport) {
      document.addEventListener('mousemove', this.onTouchMove);
      document.addEventListener('mouseup', this.onTouchEnd);
    }

    document.addEventListener('keydown', this.onKeyDown);
  }


  /**
   * Loads book if the database wasn't ready when the component mounted,
   * parses and renders book if currentBookData updates
   * @param {Object} prevProps - The previous props for the component
   * @returns {undefined} undefined
   */
  componentDidUpdate(prevProps) {
    const state = this.props.readerState;
    const prevState = prevProps.readerState;
    const tableOfContentsState = this.props.tableOfContentsState;
    const prevTableOfContentsState = prevProps.tableOfContentsState;
    const windowSize = this.props.resizerState.windowSize;
    const prevWindowSize = prevProps.resizerState.windowSize;

    // if the database wasn't ready when the component mounted but now it is,
    // load the current book
    if (!prevState.dbReady && state.dbReady) {
      this.loadBook();
    }

    // if the currentBookData has changed, load the new book
    if (prevState.currentBookData &&
      prevState.currentBookData.id &&
      state.currentBookData.id &&
      state.currentBookData.id !== prevState.currentBookData.id) {
      this.loadBook();
    }

    // if a book was loading but now it isn't, loading is complete, so parse
    // and render it.
    if (prevState.loadingBook && !state.loadingBook) {
      this.parseAndRenderBook();
    }

    // if the clickedButtonIndex does not equal the prvevious clickedButtonIndex,
    // a table of contents button was clicked
    if (tableOfContentsState.clickedButtonIndex !==
      prevTableOfContentsState.clickedButtonIndex) {
      this.navigationDirection = 'jump';
      this.loadPage(tableOfContentsState.clickedButtonIndex);
    }

    // if the browser was resized
    if (windowSize.width !== prevWindowSize.width ||
      windowSize.height !== prevWindowSize.height) {
      this.onResize();
    }
  }


  /**
   * Removes current book data from the store and stops the loader
   * @returns {undefined} undefined
   */
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('mousemove', this.onTouchMove);
    document.removeEventListener('mouseup', this.onTouchEnd);
    this.props.sliderReleased(null);
    this.props.hideLoader();
    if (this.rendition) {
      try {
        this.rendition.destroy();
      } catch (e) {
        //
      }
    }

    window.stop();
  }


  /**
   * Handler for when the slider is released
   * @param {Number} percentage - The percentage the slider was dragged
   * @returns {undefined} undefined
   */
  onSliderReleased(percentage) {
    if (this.rendition) {
      this.props.showLoader('');
      this.navigationDirection = 'jump';
      this.rendition.display(percentage)
      .then(() => {
        this.props.hideLoader();
      });
    }
  }


  /**
   * Dispatches an action to load a book based on the id from the route
   * @returns {undefined} undefined
   */
  loadBook() {
    const bookId = this.props.params.bookId;

    this.props.showLoader('Loading book');
    this.props.loadBook(bookId);
  }


  /**
   * Loads a specific page
   * @param {(String | Number)} pagePathOrPercentage - Either a path to the
   * a new page or a percentage
   * @returns {undefined} undefined
   */
  loadPage(pagePathOrPercentage) {
    if (this.rendition) {
      this.props.showLoader();
      this.rendition.display(pagePathOrPercentage)
      .then(() => {
        this.props.hideLoader();
      });
    }
  }


  /**
   * Parses book blob from the database using epub.js, sets local variables
   * based on positions, renders book
   * @returns {undefined} undefined
   */
  parseAndRenderBook() {
    const readerState = this.props.readerState;
    const bookData = readerState.currentBookData;

    if (this.rendition) {
      this.rendition.destroy();
    }

    if (bookData) {
      const bookInstance = bookData.current_book_instance;
      const deviceOS = deviceHelper.getMobileOperatingSystem();
      let contentWidth = window.innerWidth - (this.horizontalPagePadding * 2);
      if (contentWidth > this.props.maxWidth - (this.horizontalPagePadding * 2)) {
        contentWidth = this.props.maxWidth - (this.horizontalPagePadding * 2);
      }

      this.currentLocation = bookData.current_location;
      this.rendition = bookInstance.renderTo(this.bookContent,
        {
          contained: true,
          width: `${contentWidth}px`,
          height: `${window.innerHeight - 135}px`,
          pageStyle: pageStyle.getStyle(deviceOS),
        });

      bookInstance.locations.load(JSON.stringify(bookData.locations));
      this.rendition.on('locationChanged', this.onBookLocationChange);

      this.rendition.display(bookData.current_location.percentage)
        .then(this.onInitialRender);

      this.props.showLoader('Parsing book');
    }
  }


  /**
   * Re-render book on resize
   * @returns {undefined} undefined
   */
  onResize() {
    if (this.rendition) {
      this.rendition.destroy();
    }

    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      this.parseAndRenderBook();
    }, 500);
  }


  /**
   * When the book is first rendered, transition to the current page and
   * update the table of contents
   * @returns {undefined} undefined
   */
  onInitialRender() {
    const readerState = this.props.readerState;
    const bookData = readerState.currentBookData;

    this.props.hideLoader();

    if (bookData) {
      this.initialLoad = false;
      this.updateTableOfContents();
    }
  }


  /**
   * Populates the store with the current table of contents data
   * @returns {undefined} undefined
   */
  updateTableOfContents() {
    const readerState = this.props.readerState;
    const bookData = readerState.currentBookData;
    const bookInstance = bookData.current_book_instance;
    const updatedTOCData = bookInstance.navigation.toc.map((item) => {
      return Object.assign(item, {
        pageNumber: bookInstance.navigation.tocByHref[item.href],
      });
    });

    this.props.updateTableOfContents(updatedTOCData);
  }


  /**
   * Called every time a new section is navigated to. If a previous chapter is
   * navigated to, transition to the last page of that chapter. Then dispatch
   * actions to save the position data in the database.
   * @param {Object} location - A location object from epub.js
   * @returns {undefined} undefined
   */
  onBookLocationChange(location) {
    if (!this.initialLoad) {
      const readerState = this.props.readerState;
      const bookData = readerState.currentBookData;

      this.updatePositionData(bookData.id, location);

      if (readerState.sliderPercentageOnRelease !== location.percentage) {
        this.props.sliderReleased(location.percentage);
      }
    }
  }


  /**
   * Updates the book data in the database with the current location, page, and
   * section
   * @param {String} bookId - The id of the book to update
   * @param {Object} location - A location object from epub.js
   * @returns {undefined} undefined
   */
  updatePositionData(bookId, location) {
    const readerState = this.props.readerState;
    const bookData = readerState.currentBookData;

    if (bookData && bookId && location) {
      this.props.updateBookPositionData(bookId, location);
    }
  }


  /**
   * Key down handler
   * @param {Event} e - A keydown event
   * @returns {undefined} undefined
   */
  onKeyDown(e) {
    if (!this.transitioning && !this.resetting) {
      if (e.keyCode.toString() === '37') {
        this.goToPreviousPage();
        e.preventDefault();
      } else if (e.keyCode.toString() === '39') {
        this.goToNextPage();
        e.preventDefault();
      }
    }
  }


  /**
   * Loads the previous page
   * @returns {undefined} undefined
   */
  goToPreviousPage() {
    this.navigationDirection = -1;
    this.transitionToNewPage();
  }


  /**
   * Loads the next page
   * @returns {undefined} undefined
   */
  goToNextPage() {
    this.navigationDirection = 1;
    this.transitionToNewPage();
  }


  /**
   * Touch start handler - sets local variables with drag position data
   * @param {Event} e - A touchstart event
   * @returns {undefined} undefined
   */
  onTouchStart(e) {
    if (!this.transitioning && !this.resetting) {
      const eventProp = this.touchSupport
        ? e.nativeEvent.targetTouches[0]
        : e.nativeEvent;

      this.contentStartPos = this.state.contentPosition;
      this.dragStartPos = eventProp.clientX;
      this.dragging = true;
    }

    e.stopPropagation();
    e.preventDefault();
  }


  /**
   * Touch move handler - updates state with content position
   * @param {Event} e - A touchmove event
   * @returns {undefined} undefined
   */
  onTouchMove(e) {
    if (this.dragging) {
      if (!this.transitioning && !this.resetting) {
        const readerState = this.props.readerState;
        const bookData = readerState.currentBookData;

        const eventProp = this.touchSupport
          ? e.nativeEvent.targetTouches[0]
          : e;

        this.dragAmount = eventProp.clientX - this.dragStartPos;

        if (bookData.current_location.percentage === 0 &&
          this.dragAmount >= 0) {
          this.atBeginningOrEnd = true;
        } else {
          this.atBeginningOrEnd = false;
        }

        this.setState({
          contentPosition: (this.contentStartPos + this.dragAmount),
        });
      }

      e.stopPropagation();
      e.preventDefault();
    }
  }


  /**
   * Touch end handler - checks if the content was dragged and if so, which
   * direction it was dragged. Then calls a function to transition to a new
   * section.
   * @param {Event} e - A touchend event
   * @returns {undefined} undefined
   */
  onTouchEnd(e) {
    if (this.dragging) {
      let dragDistance = this.dragAmount;
      if (dragDistance < 0) {
        dragDistance *= -1;
      }

      this.dragging = false;

      if (dragDistance > 0 && !this.transitioning && !this.resetting) {
        if (this.dragAmount <= -this.dragThreshold) {
          this.navigationDirection = 1;
        }

        if (this.dragAmount >= this.dragThreshold) {
          this.navigationDirection = -1;
        }

        if (this.atBeginningOrEnd) {
          this.navigationDirection = 0;
        }

        this.transitionToNewPage();
        this.dragAmount = 0;
      }

      e.stopPropagation();
      e.preventDefault();
    }
  }


  /**
   * Sets state content variable to new position, which triggers animation to
   * new section
   * @param {Event} e - A touchend event
   * @returns {undefined} undefined
   */
  transitionToNewPage() {
    let contentWidth = window.innerWidth;
    if (contentWidth > this.props.maxWidth) {
      contentWidth = this.props.maxWidth;
    }
    const newPos = -(this.navigationDirection * contentWidth);

    this.transitioning = true;

    this.setState({ contentPosition: newPos });
  }


  /**
   * Called when section transition css animation ends, then renders new page
   * @returns {undefined} undefined
   */
  onTransitionEnd() {
    if (!this.atBeginningOrEnd && this.rendition) {
      const transitionFunction = (this.navigationDirection === 1)
        ? this.rendition.next()
        : this.rendition.prev();

      this.transitioning = false;
      this.resetting = true;

      transitionFunction.then(this.onPageRenderComplete);
    } else {
      this.transitioning = false;
      this.resetting = false;
    }

    this.atBeginningOrEnd = false;
  }


  /**
   * Called after new page is rendered
   * @returns {undefined} undefined
   */
  onPageRenderComplete() {
    setTimeout(() => {
      this.setState({ contentPosition: 0 });

      this.transitioning = false;
      this.resetting = false;
    }, 50);
  }


  /**
   * Renders header component
   * @returns {ReactElement} The header component
   */
  renderHeader() {
    const readerState = this.props.readerState;
    let bookTitle = (readerState && readerState.currentBookData)
      ? readerState.currentBookData.title
      : '';
    if (bookTitle.length > 23) {
      bookTitle = stringHelper.truncate(bookTitle, 20, '...');
    }

    return (
      <Header
        leftButton={<BackButton link={'/'} />}
        rightButton={
          <OpenTOCButton
            clickHandler={this.props.showTableOfContents}
          />
        }
        text={bookTitle}
      />
    );
  }


  /**
   * Renders an arrow button
   * @returns {ReactElement} An arrow button
   */
  renderArrowButton(position) {
    const tableOfContentsState = this.props.tableOfContentsState;
    let button;

    if (!tableOfContentsState.show) {
      const clickHandler = (position === 'left')
        ? this.goToPreviousPage
        : this.goToNextPage;

      button = (
        <ArrowButton
          position={position}
          clickHandler={clickHandler}
        />
      );
    }

    return button;
  }


  /**
   * Renders location slider
   * @returns {ReactElement} The location slider
   */
  renderLocationSlider() {
    const tableOfContentsState = this.props.tableOfContentsState;
    let element;

    if (!tableOfContentsState.show) {
      element = (
        <LocationSlider
          dragStopHandler={this.onSliderReleased}
          readerState={this.props.readerState}
        />
      );
    }

    return element;
  }


  /**
   * Renders component
   * @returns {ReactElement} The component
   */
  render() {
    const header = this.renderHeader();
    const locationSlider = this.renderLocationSlider();
    const leftArrow = this.renderArrowButton('left');
    const rightArrow = this.renderArrowButton('right');
    const loaderState = this.props.loaderState;
    const contentStyle = {
      opacity: (!loaderState.show) ? 1 : 0,
      transform: `translate3d(${this.state.contentPosition}px, 0, 0)`,
      transitionProperty: 'transform',
      transitionTimingFunction: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      transitionDuration: (this.dragging || this.resetting) ? '0s' : '.3s',
    };

    return (
      <div className={style.wrapper}>
        {leftArrow}
        <div className={style.content}>
          <div
            className={style.bookContentDraggable}
            onMouseDown={this.mouseDownHandler}
            onTouchStart={this.touchStartHandler}
            onTouchMove={this.touchMoveHandler}
            onTouchEnd={this.touchEndHandler}
            onTransitionEnd={this.onTransitionEnd}
            style={contentStyle}
          >
            <PlaceholderPage left />
            <div className={style.bookContentWrapper}>
              <div
                className={style.bookContent}
                ref={(bookContent) => { this.bookContent = bookContent; }}
              />
            </div>
            <PlaceholderPage right />
          </div>
          {locationSlider}
          {header}
        </div>
        {rightArrow}
      </div>
    );
  }
}


Reader.defaultProps = {
  maxWidth: 650,
};


/**
 * PropTypes
 * @prop {Function} hideLoader - Function to dispatch a
 * BOOK_POSITION_FOUND action
 * @prop {Number} maxWidth - The max width of the view
 * @prop {Function} showLoader - Function to dispatch a
 * FINDING_BOOK_POSITION action
 * @prop {Function} loadBook - Function to dispatch a LOAD_BOOK action
 * @prop {Object} loaderState - The loader state from the store
 * @prop {Object} params - The route params
 * @prop {Object} readerState - The reader state from the store
 * @prop {Object} resizerState - The resizer state from the store
 * @prop {Function} showTableOfContents - Function to dispatch a
 * SHOW_TABLE_OF_CONTENTS action
 * @prop {Function} sliderReleased - Function to dispatch a
 * SLIDER_RELEASED action
 * @prop {Object} tableOfContentsState - The table of contents state from the store
 * @prop {Function} updateBookPositionData - Function to dispatch an
 * UPDATE_BOOK_POSITION_DATA action
 * @prop {Function} updateTableOfContents - Function to dispatch an
 * UPDATE_TABLE_OF_CONTENTS action
 */
Reader.propTypes = {
  hideLoader: React.PropTypes.func.isRequired,
  maxWidth: React.PropTypes.number,
  showLoader: React.PropTypes.func.isRequired,
  loadBook: React.PropTypes.func.isRequired,
  loaderState: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  readerState: React.PropTypes.object.isRequired,
  resizerState: React.PropTypes.object.isRequired,
  showTableOfContents: React.PropTypes.func.isRequired,
  sliderReleased: React.PropTypes.func.isRequired,
  tableOfContentsState: React.PropTypes.object.isRequired,
  updateBookPositionData: React.PropTypes.func.isRequired,
  updateTableOfContents: React.PropTypes.func.isRequired,
};

export default Reader;
