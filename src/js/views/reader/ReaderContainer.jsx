import { connect } from 'react-redux';
import {
  showLoader,
  hideLoader,
} from 'ui/loader/loader-actions';
import {
  updateTableOfContents,
  showTableOfContents,
} from 'views/table-of-contents/table-of-contents-actions';
import Reader from './Reader.jsx';
import {
  loadBook,
  updateBookPositionData,
  sliderReleased,
} from './reader-actions';


/**
 * Extracts the loader and reader states from the app state
 * @param {Object} state - The app state
 * @returns {Object} The loader and reader state
 */
const mapStateToProps = (state) => {
  const {
    loaderState,
    readerState,
    resizerState,
    tableOfContentsState,
  } = state;

  return {
    loaderState,
    readerState,
    resizerState,
    tableOfContentsState,
  };
};


/**
 * Creates an object with actions to use in the component
 * @param {Function} dispatch - A Redux dispatch function
 * @returns {Object} An object with action dispatch functions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    showLoader: (message) => {
      dispatch(showLoader(message));
    },

    hideLoader: () => {
      dispatch(hideLoader());
    },

    loadBook: (id) => {
      dispatch(loadBook(id));
    },

    updateBookPositionData: (id, location, page, section) => {
      dispatch(updateBookPositionData(id, location, page, section));
    },

    updateTableOfContents: (data) => {
      dispatch(updateTableOfContents(data));
    },

    showTableOfContents: () => {
      dispatch(showTableOfContents());
    },

    sliderReleased: (percentage) => {
      dispatch(sliderReleased(percentage));
    },
  };
};

const ReaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reader);

export default ReaderContainer;
