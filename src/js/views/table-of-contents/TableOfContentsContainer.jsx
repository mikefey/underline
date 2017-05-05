import { connect } from 'react-redux';
import TableOfContents from './TableOfContents.jsx';
import {
  hideTableOfContents,
  tableOfContentsButtonClicked,
} from './table-of-contents-actions';


/**
 * Extracts the table of contents state state from the app state
 * @param {Object} state - The app state
 * @returns {Object} The loader state
 */
const mapStateToProps = (state) => {
  const { tableOfContentsState } = state;

  return {
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
    hideTableOfContents: () => {
      dispatch(hideTableOfContents());
    },

    tableOfContentsButtonClicked: (index) => {
      dispatch(tableOfContentsButtonClicked(index));
    },
  };
};

const TableOfContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableOfContents);

export default TableOfContentsContainer;
