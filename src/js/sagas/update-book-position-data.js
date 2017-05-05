import { put, call } from 'redux-saga/effects';
import indexedDB from 'libs/indexeddb/indexeddb';
import {
  UPDATE_BOOK_POSITION_DATA_ERROR,
  BOOK_POSITION_DATA_UPDATED,
} from 'views/reader/reader-constants';


function *updateBookPositionData(action) {
  try {
    const updatedData = yield call(indexedDB.updateItemById,
      action.id,
      {
        current_location: action.location,
      },
      'books',
    );

    yield put({ type: BOOK_POSITION_DATA_UPDATED, data: updatedData });
  } catch (error) {
    yield put({ type: UPDATE_BOOK_POSITION_DATA_ERROR });
  }
}

export {
  updateBookPositionData,
};
