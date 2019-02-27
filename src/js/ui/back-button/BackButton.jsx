import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './BackButton.scss';


/**
 * Back button component
 */
const BackButton = (props) => {
  return (
    <Link to={props.link} className={style.wrapper}>
      <div className={style.icon}>
        <div className={style.iconLineOne} />
        <div className={style.iconLineTwo} />
        <div className={style.iconLineThree} />
      </div>
    </Link>
  );
};


/**
 * PropTypes
 * @prop {String} link - The url to navigate to when the button is clicked
 */
BackButton.propTypes = {
  link: PropTypes.string.isRequired,
};

export default BackButton;
