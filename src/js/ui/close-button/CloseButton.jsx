import React from 'react';
import style from './CloseButton.scss';


/**
 * Close table of contents button component
 * @param {Object} props - The component props
 */
const CloseButton = (props) => {
  return (
    <button
      className={style.wrapper}
      onClick={props.clickHandler}
    >
      <div className={style.icon}>
        <div className={style.iconLineOne} />
        <div className={style.iconLineTwo} />
      </div>
    </button>
  );
};


/**
 * PropTypes
 * @prop {Function} clickHandler - The function to call when component is
 * clicked
 */
CloseButton.propTypes = {
  clickHandler: React.PropTypes.func.isRequired,
};

export default CloseButton;
