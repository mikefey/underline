import { WINDOW_RESIZED } from './resizer-constants';

const initialState = {
  windowSize: {
    width: 0,
    height: 0,
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case WINDOW_RESIZED:
      return Object.assign({}, state, {
        windowSize: action.size,
      });

    default:
      return state;
  }
}
