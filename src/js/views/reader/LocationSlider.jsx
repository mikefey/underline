import React from 'react';
import PropTypes from 'prop-types';
import style from './LocationSlider.scss';


/**
 * Component for location slider
 * @param {Object} props - The component props
 * @returns {undefined} undefined
 */
class LocationSlider extends React.Component {
  constructor(props) {
    super(props);

    this.padding = 20;
    this.dragging = false;
    this.dragStartPos = 0;
    this.draggerStartPos = 0;
    this.percentageDragged = 0;

    this.state = {
      draggerPosition: 0,
    };

    this.getDraggerPosition = this.getDraggerPosition.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }


  /**
   * Set up event handlers based on touch support
   * @returns {undefined} undefined
   */
  componentDidMount() {
    this.touchSupport = ('ontouchstart' in window || window.DocumentTouch);
    this.mouseDownHandler = !this.touchSupport ? this.onTouchStart : null;
    this.touchStartHandler = this.touchSupport ? this.onTouchStart : null;
    this.touchMoveHandler = this.touchSupport ? this.onTouchMove : null;
    this.touchEndHandler = this.touchSupport ? this.onTouchEnd : null;

    if (!this.touchSupport) {
      document.addEventListener('mousemove', this.onTouchMove);
      document.addEventListener('mouseup', this.onTouchEnd);
    }
  }


  /**
   * Remove event handler when component unmounts
   * @returns {undefined} undefined
   */
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onTouchMove);
    document.removeEventListener('mouseup', this.onTouchEnd);
  }


  /**
   * If the the reader state's sliderPercentageOnRelease property doesn't equal
   * this component's internal drag percentage, update it so they match
   * @returns {undefined} undefined
   */
  componentDidUpdate(prevProps) {
    const state = this.props.readerState;
    const prevState = prevProps.readerState;
    let paddingOffset = (this.padding * 4);
    if (window.innerWidth >= this.props.maxWidth) {
      paddingOffset = (this.padding * 2);
    }
    let componentWidth = window.innerWidth - paddingOffset;
    if (componentWidth > this.props.maxWidth) {
      componentWidth = this.props.maxWidth;
    }

    if (state.sliderPercentageOnRelease !== prevState.sliderPercentageOnRelease) {
      let newPosition = componentWidth * state.sliderPercentageOnRelease;
      if (newPosition > componentWidth) {
        newPosition = componentWidth;
      }

      if (newPosition < 0) {
        newPosition = 0;
      }

      if (!this.dragging && newPosition !== this.state.draggerPosition) {
        this.setState({ draggerPosition: newPosition });
        this.percentageDragged = state.sliderPercentageOnRelease;
      }
    }
  }


  /**
   * Touch start handler - sets local variables with drag position data
   * @param {Event} e - A touchstart event
   * @returns {undefined} undefined
   */
  onTouchStart(e) {
    const eventProp = this.touchSupport
      ? e.nativeEvent.targetTouches[0]
      : e.nativeEvent;
    this.draggerStartPos = this.state.draggerPosition;
    this.dragStartPos = eventProp.clientX;
    this.dragging = true;

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
      let paddingOffset = (this.padding * 4);
      if (window.innerWidth >= this.props.maxWidth) {
        paddingOffset = (this.padding * 2);
      }
      let componentWidth = window.innerWidth - paddingOffset;
      if (componentWidth > this.props.maxWidth) {
        componentWidth = this.props.maxWidth;
      }
      const eventProp = this.touchSupport
        ? e.nativeEvent.targetTouches[0]
        : e;
      const draggerPosition = eventProp.clientX;

      this.dragAmount = draggerPosition - this.dragStartPos;

      const newPosition = this.getDraggerPosition();

      this.percentageDragged = newPosition / componentWidth;

      this.setState({ draggerPosition: newPosition });

      e.stopPropagation();
      e.preventDefault();
    }
  }


  /**
   * Touch end handler
   * @param {Event} e - A touchend event
   * @returns {undefined} undefined
   */
  onTouchEnd(e) {
    if (this.dragging) {
      // If the percentage dragged is 100, the epub won't know what to load,
      // because that's equivalent to loading a page after the last page. So
      // here the position is set to 99% as a fail-safe.
      let percentageDragged = this.percentageDragged;
      if (percentageDragged >= 1) {
        percentageDragged = 0.99;
      }

      this.dragging = false;
      this.props.dragStopHandler(percentageDragged);

      e.stopPropagation();
      e.preventDefault();
    }
  }


  /**
   * Returns dragger position based on how far the slider was dragged
   * @returns {Number} The new dragger position
   */
  getDraggerPosition() {
    let paddingOffset = (this.padding * 4);
    if (window.innerWidth >= this.props.maxWidth) {
      paddingOffset = (this.padding * 2);
    }
    let componentWidth = window.innerWidth - paddingOffset;
    if (componentWidth > this.props.maxWidth) {
      componentWidth = this.props.maxWidth;
    }
    let newPosition = (this.draggerStartPos + this.dragAmount);
    if (newPosition > componentWidth) {
      newPosition = componentWidth;
    }

    if (newPosition < 0) {
      newPosition = 0;
    }

    return newPosition;
  }


  /**
   * Renders component
   * @returns {ReactElement} The component
   */
  render() {
    const draggerStyle = {
      transform: `translate3d(${this.state.draggerPosition}px, 0, 0)`,
    };
    const progressStyle = {
      width: `${this.state.draggerPosition}px`,
    };

    return (
      <div className={style.wrapper}>
        <div className={style.sliderWrapper}>
          <div className={style.sliderTrack} />
          <div className={style.sliderProgress} style={progressStyle} />
          <div
            className={style.sliderDraggable}
            onMouseDown={this.mouseDownHandler}
            onTouchStart={this.touchStartHandler}
            onTouchMove={this.touchMoveHandler}
            onTouchEnd={this.touchEndHandler}
            style={draggerStyle}
          >
            <div className={style.sliderHandle} />
          </div>
        </div>
      </div>
    );
  }
}

LocationSlider.defaultProps = {
  maxWidth: 650,
};


/**
 * PropTypes
 * @prop {Function} dragStopHandler - The function to call after the slider
 * is dragged
 */

LocationSlider.propTypes = {
  dragStopHandler: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
  readerState: PropTypes.object.isRequired,
};

export default LocationSlider;
