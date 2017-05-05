import React, { Component } from 'react';


/**
 * Resizer component
 * @class
 */
class Resizer extends Component {
  constructor(props) {
    super(props);

    this.touchSupport = ('ontouchstart' in window || window.DocumentTouch);
    this.resizeTimeout = 0;

    // bind functions to component
    this.onResize = this.onResize.bind(this);
  }


  /**
   * Called after component mounts to DOM
   * @returns {undefined} undefined
   */
  componentDidMount() {
    if (!this.touchSupport) {
      window.addEventListener('resize', this.onResize);
    } else {
      window.addEventListener('orientationchange', this.onResize);
    }

    // small delay so any components mounted before this one will still get
    // the correct initial window size
    setTimeout(this.onResize, 10);
  }


  /**
   * Called before component is removed from DOM
   * @returns {undefined} undefined
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
  }


  /**
   * Renders component
   * @returns {null} null
   */
  render() {
    return null;
  }


  /**
   * Called when the browser is resized
   * @returns {undefined} undefined
   */
  onResize() {
    const useScreenDimensions = this.props.useScreenDimensions;

    const dimensions = {
      width: useScreenDimensions ? screen.width : window.innerWidth,
      height: useScreenDimensions ? screen.height : window.innerHeight,
    };

    this.props.windowResized(dimensions);
  }
}

Resizer.defaultProps = {
  useScreenDimensions: false,
};


/**
 * Expected propTypes
 * @prop {Function} useScreenDimensions - If the component should use the screen
 * object to read dimensions instead of the window
 * @prop {Function} windowResized - An action function for a WINDOW_RESIZED event
 */
Resizer.propTypes = {
  useScreenDimensions: React.PropTypes.bool,
  windowResized: React.PropTypes.func.isRequired,
};


export default Resizer;
