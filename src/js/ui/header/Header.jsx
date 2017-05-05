import React from 'react';
import style from './Header.scss';

/**
 * Header component
 */
const Header = (props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        {props.leftButton}
        <h2 className={style.title}>{props.text}</h2>
        {props.rightButton}
      </div>
    </div>
  );
};

Header.defaultProps = {
  leftButton: null,
  rightButton: null,
};


/**
 * PropTypes
 * @prop {ReactElement} leftButton - A button component to display on the left
 * side of the header
 * @prop {ReactElement} rightButton - A button component to display on the right
 * side of the header
 * @prop {String} text - The text to display in the header
 */
Header.propTypes = {
  leftButton: React.PropTypes.element,
  rightButton: React.PropTypes.element,
  text: React.PropTypes.string.isRequired,
};

export default Header;
