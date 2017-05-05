import { connect } from 'react-redux';
import { hideAddToHomescreen } from './add-to-homescreen-actions';
import AddToHomescreen from './AddToHomescreen.jsx';

/**
 * Extracts the loader state from the app state
 * @param {Object} state - The app state
 * @returns {Object} The loader state
 */
const mapStateToProps = (state) => {
  const { addToHomescreenState } = state;

  return {
    addToHomescreenState,
  };
};


/**
 * Creates an object with actions to use in the component
 * @param {Function} dispatch - A Redux dispatch function
 * @returns {Object} An object with action dispatch functions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    hideAddToHomescreen: () => {
      dispatch(hideAddToHomescreen());
    },
  };
};

const AddToHomescreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddToHomescreen);

export default AddToHomescreenContainer;
