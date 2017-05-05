import React from 'react';
import style from './ArrowButton.scss';


/**
 * Component for arrow button to go forward/backward on Desktop
 * @param {Object} props - The component props
 */
const ArrowButton = (props) => {
  const wrapperStyle = (props.position !== 'right')
    ? style.wrapper
    : style.wrapperRight;

  return (
    <button
      className={wrapperStyle}
      onClick={props.clickHandler}
    >
      <div className={style.icon}>
        <div className={style.iconLine} />
        <div className={style.iconLineTwo} />
      </div>
    </button>
  );
};


/**
 * PropTypes
 * @prop {Function} clickHandler - The function to call when component is
 * clicked
 * @prop {String} position - Either 'left' or 'right'
 */
ArrowButton.propTypes = {
  clickHandler: React.PropTypes.func.isRequired,
  position: React.PropTypes.string.isRequired,
};

export default ArrowButton;
