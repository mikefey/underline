import {
  DB_READY,
} from './indexeddb-constants';


/**
 * Returns a DB_READY action object
 * @return {Object} An action object
 */
const dbReady = () => {
  return {
    type: DB_READY,
  };
};

export { dbReady };
