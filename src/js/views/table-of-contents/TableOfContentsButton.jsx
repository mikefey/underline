import React from 'react';
import style from './TableOfContentsButton.scss';


/**
 * Table of contents section button component
 * @param {Object} props - The component props
 */
const TableOfContentsButton = (props) => {
  let buttonText = props.data.label;
  buttonText = buttonText.split('\n').join('');
  buttonText = buttonText.trim();

  return (
    <button
      className={style.wrapper}
      onClick={props.clickHandler}
    >
      <h4>{buttonText}</h4>
    </button>
  );
};


/**
 * PropTypes
 * @prop {Function} clickHandler - The function to call when component is
 * clicked
 * @prop {Object} data - An object with the section data
 */
TableOfContentsButton.propTypes = {
  clickHandler: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

export default TableOfContentsButton;
