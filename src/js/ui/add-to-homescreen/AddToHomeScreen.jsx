import React, { Component } from 'react';
import cookieHelper from 'libs/cookie/cookie-helper';
import CloseButton from 'ui/close-button/CloseButton.jsx';
import style from './AddToHomescreen.scss';

/**
 * An 'add to homescreen' UI component
 */
class AddToHomescreen extends Component {
  constructor(props) {
    super(props);

    this.renderIOSIcon = this.renderIOSIcon.bind(this);
    this.renderAndroidIcon = this.renderAndroidIcon.bind(this);
    this.renderText = this.renderText.bind(this);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
  }


  /**
   * Hide component in 5 seconds if it's not closed already
   * @returns {undefined} undefined
   */
  componentDidMount() {
    setTimeout(() => {
      const state = this.props.addToHomescreenState;
      if (state.show) {
        this.onCloseButtonClick();
      }
    }, 5000);
  }


  /**
   * Returns the iOS share icon SVG
   * @returns {ReactElement} The iOS icon
   */
  renderIOSIcon() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='50'
        height='50'
        viewBox='0 0 50 50'
      >
        <path
          d='M 25 0.59375 L 24.28125 1.28125 L 16.28125 9.28125 A 1.016466
          1.016466 0 1 0 17.71875 10.71875 L 24 4.4375 L 24 32 A 1.0001 1.0001
          0 1 0 26 32 L 26 4.4375 L 32.28125 10.71875 A 1.016466 1.016466 0 1 0
          33.71875 9.28125 L 25.71875 1.28125 L 25 0.59375 z M 7 16 L 7 17 L 7
          49 L 7 50 L 8 50 L 42 50 L 43 50 L 43 49 L 43 17 L 43 16 L 42 16 L 33
          16 A 1.0001 1.0001 0 1 0 33 18 L 41 18 L 41 48 L 9 48 L 9 18 L 17 18 A
          1.0001 1.0001 0 1 0 17 16 L 8 16 L 7 16 z' color='#000'
        />
      </svg>
    );
  }


  /**
   * Returns the Android share icon SVG
   * @returns {ReactElement} The iOS icon
   */
  renderAndroidIcon() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='536.602px'
        height='536.602px'
        viewBox='0 0 536.602 536.602'
      >
        <g>
          <rect x='194.86' width='146.881' height='146.88' />
          <rect x='194.86' y='194.861' width='146.881' height='146.88' />
          <rect x='194.86' y='389.722' width='146.881' height='146.88' />
        </g>
      </svg>
    );
  }


  /**
   * Renders the text
   * @returns {ReactElement} The text
   */
  renderText() {
    const state = this.props.addToHomescreenState;
    let text;

    if (state.os === 'iOS') {
      let positionText = 'below';
      if (window.innerWidth >= 768) {
        positionText = 'above';
      }

      text = (
        <div>To install, click the
          <span className={style.iOSIcon}>{this.renderIOSIcon()}</span> icon
            {' '}<span>{positionText}</span>{' '}
          and choose 'Add to Home Screen'</div>
      );
    }

    if (state.os === 'Android') {
      text = (
        <div>To install, click the
          <span className={style.androidIcon}>{this.renderAndroidIcon()}</span> icon above
            right and choose 'Add to Home Screen'</div>
      );
    }

    return text;
  }


  /**
   * Click handler for close button
   * @returns {undefined} undefined
   */
  onCloseButtonClick() {
    cookieHelper.setItem('add-to-homescreen-prompt-shown', true);

    this.props.hideAddToHomescreen();
  }


  /**
   * Renders component
   * @returns {ReactElement} The component
   */
  render() {
    const state = this.props.addToHomescreenState;
    const text = this.renderText();
    const wrapperClass = state.show ? style.wrapperShowing : style.wrapper;

    return (
      <div className={wrapperClass}>
        <div
          className={style.background}
          onClick={this.onCloseButtonClick}
        />
        <div className={style.content}>
          <CloseButton
            clickHandler={this.onCloseButtonClick}
          />
          <div className={style.text}>{text}</div>
        </div>
      </div>
    );
  }
}


/**
 * PropTypes
 * @prop {Object} addToHomescreenState - The addToHomeScreen state in the store
 * @prop {Function} hideAddToHomescreen - function to dispatch a
 * HIDE_ADD_TO_HOMESCREEN action
 */
AddToHomescreen.propTypes = {
  addToHomescreenState: React.PropTypes.object.isRequired,
  hideAddToHomescreen: React.PropTypes.func.isRequired,
};

export default AddToHomescreen;
