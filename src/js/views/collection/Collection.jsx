import React from 'react';
import PropTypes from 'prop-types';
import indexedDB from 'libs/indexeddb/indexeddb';
import Header from 'ui/header/Header.jsx';
import InfoButton from './InfoButton.jsx';
import AddBooksButton from './AddBooksButton.jsx';
import CollectionBook from './CollectionBook.jsx';
import style from './Collection.scss';


/**
 * Collection view component
 */
class Collection extends React.Component {
  constructor(props) {
    super(props);

    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
    this.onInfoButtonClick = this.onInfoButtonClick.bind(this);
  }


  /**
   * Get collection from database if database is ready
   * @returns {undefined} undefined
   */
  componentDidMount() {
    const collectionState = this.props.collectionState;

    if (collectionState.dbReady) {
      this.props.getCollection();
    }

    this.props.updateCurrentBookData(null);
  }


  /**
   * Gets collection from database if the database wansn't ready when the
   * component mounted
   * @returns {undefined} undefined
   */
  componentDidUpdate(prevProps) {
    const prevState = prevProps.collectionState;
    const collectionState = this.props.collectionState;

    if (!prevState.dbReady &&
      collectionState.dbReady &&
      !collectionState.initialCollectionLoaded) {
      this.props.getCollection();
    }
  }


  /**
   * Click handler for the info button
   * @returns {undefined} undefined
   */
  onInfoButtonClick() {
    this.props.showInfo();
  }


  /**
   * Click handler for the book 'remove' buttons
   * @param {String} id - The id of the book to remove
   * @returns {undefined} undefined
   */
  onRemoveButtonClick(id) {
    const conf = confirm('Are you sure you want to delete this book?');

    if (conf) {
      indexedDB.deleteItem(id, 'books')
      .then(() => {
        this.props.getCollection();
      });
    }
  }


  /**
   * Renders message for an empty collection
   * @returns {ReactElement} Message for an empty collection
   */
  renderNoBooks() {
    const collectionState = this.props.collectionState;
    const loaderState = this.props.loaderState;
    let el;

    if (!loaderState.show && !collectionState.collection.length &&
      !collectionState.downloadingBook) {
      el = (
        <div className={style.message}>
          <p><span>You don't have any books in your collection.
          Click the button above right to add some from your <a href='https://dropbox.com' target='_blank' rel='noopener noreferrer'>Dropbox</a>.</span></p>
          <p>Don't have any ebooks? Download some for free at <a href='https://www.gutenberg.org/' target='_blank' rel='noopener noreferrer'>Project Gutenberg</a>.</p>
        </div>
      );
    }

    return el;
  }


  /**
   * Renders collection
   * @returns {Array<ReactElement>} An array of book buttons
   */
  renderBooks() {
    const collectionState = this.props.collectionState;
    const loaderState = this.props.loaderState;
    let books;

    if (!loaderState.show &&
      collectionState.collection.length &&
      !collectionState.downloadingBook) {
      books = [];

      for (let i = 0; i < collectionState.collection.length; i++) {
        const bookData = collectionState.collection[i];

        books.push(
          <CollectionBook
            data={bookData}
            key={'collection-book-' + i + '-' + bookData.id}
            removeButtonClickHandler={this.onRemoveButtonClick}
            windowSize={this.props.resizerState.windowSize}
          />,
        );
      }
    }

    return books;
  }


  /**
   * Renders component
   * @returns {ReactElement} The component
   */
  render() {
    const noBooksMessage = this.renderNoBooks();
    const books = this.renderBooks();

    return (
      <div className={style.wrapper}>
        <Header
          leftButton={
            <InfoButton clickHandler={this.onInfoButtonClick} />
          }
          rightButton={
            <AddBooksButton {...this.props} />
          }
          text={'Your books'}
        />
        <div className={style.booksWrapper}>
          {noBooksMessage}
          {books}
        </div>
      </div>
    );
  }
}


/**
 * PropTypes
 * @prop {Object} collectionState - The collection state in the store
 * @prop {Function} getCollection - function to dispatch a GET_COLLECTION action
 * @prop {Object} loaderState - The loader state in the store
 * @prop {Object} resizerState - The resizer state in the store
 * @prop {Function} showInfo - Function to dispatch a SHOW_INFO action
 * @prop {Function} updateCurrentBookData - Function to dispatch an
 * UPDATE_CURRENT_BOOK_DATA action
 */
Collection.propTypes = {
  collectionState: PropTypes.object.isRequired,
  getCollection: PropTypes.func.isRequired,
  loaderState: PropTypes.object.isRequired,
  resizerState: PropTypes.object.isRequired,
  showInfo: PropTypes.func.isRequired,
  updateCurrentBookData: PropTypes.func.isRequired,
};

export default Collection;
