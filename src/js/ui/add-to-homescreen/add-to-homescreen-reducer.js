import {
  SHOW_ADD_TO_HOMESCREEN,
  HIDE_ADD_TO_HOMESCREEN,
} from './add-to-homescreen-constants';

const initialState = {
  show: false,
  os: null,
};


/**
 * Updates the state based on the action type
 * @param {Object} state - The current loader state
 * @param {Object} action - A dispatched action
 * @return {Object} The updated state
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_ADD_TO_HOMESCREEN:
      return {
        ...state,
        show: true,
        os: action.os,
      };

    case HIDE_ADD_TO_HOMESCREEN:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
}
