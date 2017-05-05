import { connect } from 'react-redux';
import { windowResized } from './resizer-actions';
import Resizer from './Resizer.jsx';


/**
 * Creates an object with actions to use in the component
 * @param {Function} dispatch - A Redux dispatch function
 * @returns {Object} An object with action dispatch functions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    windowResized: (size) => {
      dispatch(windowResized(size));
    },
  };
};

const ResizerContainer = connect(
  null,
  mapDispatchToProps,
)(Resizer);

export default ResizerContainer;
