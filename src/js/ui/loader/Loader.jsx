import React from 'react';
import style from './Loader.scss';

/**
 * A loader UI component
 */
const Loader = (props) => {
  const wrapperClassName = props.loaderState.show
    ? style.wrapperShow
    : style.wrapper;

  return (
    <div className={wrapperClassName}>
      <h2 className={style.message}>{props.loaderState.message}</h2>
      <div className={style.loader} />
    </div>
  );
};


/**
 * PropTypes
 * @prop {Object} loaderState - The loader state in the store
 */
Loader.propTypes = {
  loaderState: React.PropTypes.object.isRequired,
};

export default Loader;
