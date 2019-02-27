import React from 'react';
import PropTypes from 'prop-types';
import style from './InfoButton.scss';


/**
 * Component for info button
 * @param {Object} props - The component props
 */
const InfoButton = (props) => {
  return (
    <button
      className={style.wrapper}
      onClick={props.clickHandler}
    >
      <div className={style.icon}>i</div>
    </button>
  );
};


/**
 * PropTypes
 * @prop {Function} clickHandler - The function to call when component is
 * clicked
 */
InfoButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default InfoButton;
