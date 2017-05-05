import {
  UPDATE_TABLE_OF_CONTENTS,
  SHOW_TABLE_OF_CONTENTS,
  HIDE_TABLE_OF_CONTENTS,
  TABLE_OF_CONTENTS_BUTTON_CLICKED,
} from './table-of-contents-constants';

const initialState = {
  clickedButtonIndex: null,
  data: null,
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
    case UPDATE_TABLE_OF_CONTENTS:
      return {
        ...state,
        data: action.data,
      };

    case SHOW_TABLE_OF_CONTENTS:
      return {
        ...state,
        show: true,
      };

    case HIDE_TABLE_OF_CONTENTS:
      return {
        ...state,
        show: false,
      };

    case TABLE_OF_CONTENTS_BUTTON_CLICKED:
      return {
        ...state,
        clickedButtonIndex: action.index,
      };

    default:
      return state;
  }
}
