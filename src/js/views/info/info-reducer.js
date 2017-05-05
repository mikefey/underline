import {
  SHOW_INFO,
  HIDE_INFO,
} from './info-constants';

const initialState = {
  show: false,
};


/**
 * Updates the state based on the action type
 * @param {Object} state - The current loader state
 * @param {Object} action - A dispatched action
 * @return {Object} The updated state
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_INFO:
      return {
        ...state,
        show: true,
      };

    case HIDE_INFO:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
}
