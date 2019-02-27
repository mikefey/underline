import React from 'react';
import PropTypes from 'prop-types';
import style from './OpenTOCButton.scss';


/**
 * Component for button to open table of contents button
 * @param {Object} props - The component props
 */
const OpenTOCButton = (props) => {
  return (
    <button
      className={style.wrapper}
      onClick={props.clickHandler}
    >
      <div className={style.icon}>
        <div className={style.iconLine} />
        <div className={style.iconLine} />
        <div className={style.iconLine} />
      </div>
    </button>
  );
};


/**
 * PropTypes
 * @prop {Function} clickHandler - The function to call when component is
 * clicked
 */
OpenTOCButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default OpenTOCButton;
