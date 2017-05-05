import { connect } from 'react-redux';
import Loader from './Loader.jsx';

/**
 * Extracts the loader state from the app state
 * @param {Object} state - The app state
 * @returns {Object} The loader state
 */
const mapStateToProps = (state) => {
  const { loaderState } = state;

  return {
    loaderState,
  };
};

const LoaderContainer = connect(
  mapStateToProps,
  null,
)(Loader);

export default LoaderContainer;
