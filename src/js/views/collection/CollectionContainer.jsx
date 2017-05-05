import { connect } from 'react-redux';
import { showInfo } from 'views/info/info-actions';
import { updateCurrentBookData } from 'views/reader/reader-actions';
import Collection from './Collection.jsx';
import { downloadBook, getCollection } from './collection-actions';


/**
 * Extracts the collection state from the app state
 * @param {Object} state - The app state
 * @returns {Object} The loader state
 */
const mapStateToProps = (state) => {
  const {
    collectionState,
    loaderState,
    resizerState,
  } = state;

  return {
    collectionState,
    loaderState,
    resizerState,
  };
};


/**
 * Creates an object with actions to use in the component
 * @param {Function} dispatch - A Redux dispatch function
 * @returns {Object} An object with action dispatch functions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    downloadBook: (url) => {
      dispatch(downloadBook(url));
    },

    getCollection: () => {
      dispatch(getCollection());
    },

    showInfo: () => {
      dispatch(showInfo());
    },

    updateCurrentBookData: (data) => {
      dispatch(updateCurrentBookData(data));
    },
  };
};

const CollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Collection);

export default CollectionContainer;
