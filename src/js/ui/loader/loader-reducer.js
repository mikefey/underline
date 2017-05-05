import {
  SHOW_LOADER,
  HIDE_LOADER,
} from './loader-constants';

const initialState = {
  show: false,
  message: '',
};


/**
 * Updates the state based on the action type
 * @param {Object} state - The current loader state
 * @param {Object} action - A dispatched action
 * @return {Object} The updated state
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        show: true,
        message: action.message,
      };

    case HIDE_LOADER:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
}
