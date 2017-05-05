import update from 'immutability-helper';
import {
  DB_READY,
} from 'libs/indexeddb/indexeddb-constants';
import {
  LOAD_BOOK,
  LOAD_BOOK_COMPLETE,
  UPDATE_CURRENT_BOOK_DATA,
  READER_EXITED,
  BOOK_POSITION_DATA_UPDATED,
  SLIDER_RELEASED,
} from './reader-constants';

const initialState = {
  loadingBook: false,
  currentBookId: null,
  currentBookData: null,
  jumpToPage: null,
  sliderPercentageOnRelease: 0,
};


/**
 * Updates the state based on the action type
 * @param {Object} state - The current loader state
 * @param {Object} action - A dispatched action
 * @return {Object} The updated state
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DB_READY:
      return {
        ...state,
        dbReady: true,
      };

    case LOAD_BOOK:
      return {
        ...state,
        loadingBook: true,
      };

    case LOAD_BOOK_COMPLETE:
      return {
        ...state,
        loadingBook: false,
      };

    case UPDATE_CURRENT_BOOK_DATA:
      return {
        ...state,
        currentBookData: action.data,
      };

    case READER_EXITED:
      return {
        ...state,
        currentBookData: null,
        loadingBook: false,
      };

    case BOOK_POSITION_DATA_UPDATED:
      let newState = state;

      if (state.currentBookData) {
        const newBookData = update(state.currentBookData, { $merge: {
          current_location: action.data.current_location,
        } });

        newState = {
          ...state,
          currentBookData: newBookData,
        };
      }

      return newState;

    case SLIDER_RELEASED:
      return {
        ...state,
        sliderPercentageOnRelease: action.percentage,
      };

    default:
      return state;
  }
}
