import { connect } from 'react-redux';
import Info from './Info.jsx';
import {
  hideInfo,
} from './info-actions';


/**
 * Extracts the table of contents state state from the app state
 * @param {Object} state - The app state
 * @returns {Object} The loader state
 */
const mapStateToProps = (state) => {
  const { infoState } = state;

  return {
    infoState,
  };
};


/**
 * Creates an object with actions to use in the component
 * @param {Function} dispatch - A Redux dispatch function
 * @returns {Object} An object with action dispatch functions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    hideInfo: () => {
      dispatch(hideInfo());
    },
  };
};

const InfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Info);

export default InfoContainer;
