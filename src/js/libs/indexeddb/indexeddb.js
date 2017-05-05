/**
 * A library for working with indexeddb
 */
const indexedDB = {
  /**
   * Initializes library and creates object store and indexes
   * if they don't exist
   * @param {String} dbName - The name of the object store
   * @param {Number} version - The version of the DB
   * @param {Array} schemas - An array of schema objects
   * @returns {Object} A promise with the database instance
   */
  init(dbName, version, schemas) {
    const instance = this;

    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined') {
        if (!instance.db) {
          // if 'this.db' is not defined, the database needs to be set up
          instance.setGlobals();
          instance.dbName = dbName;
          instance.dbVersion = version;
          instance.schemas = schemas;
          instance.createSchema = instance.createSchema.bind(instance);
          instance.addItem = instance.addItem.bind(instance);
          instance.getItemById = instance.getItemById.bind(this);
          instance.updateItemById = instance.updateItemById.bind(instance);
          instance.getAll = instance.getAll.bind(instance);

          if (window.indexedDB) {
            const request =
              window.indexedDB.open(instance.dbName, instance.dbVersion);

            request.onsuccess = (e) => {
              instance.db = e.target.result;

              resolve(instance.db);
            };

            request.onerror = (e) => {
              reject('Database error: ' + e.target.errorCode);
            };

            request.onupgradeneeded = (e) => {
              instance.createSchema(e.target.result);
            };
          } else {
            reject('No indexedDB property exists on the window');
          }
        } else {
          // if 'this.db' is already defined
          resolve(instance.db);
        }
      } else {
        // if 'window' is not defined
        reject('window is not defined');
      }
    });
  },


  /**
   * Sets window variables
   * @returns {undefined} undefined
   */
  setGlobals() {
    if (!window.indexedDB) {
      window.indexedDB = window.mozIndexedDB
        || window.webkitIndexedDB
        || window.msIndexedDB;
    }

    if (!window.IDBTransaction) {
      window.IDBTransaction = window.webkitIDBTransaction
        || window.msIDBTransaction
        || { READ_WRITE: 'readwrite' };
    }

    if (!window.IDBKeyRange) {
      window.IDBKeyRange = window.webkitIDBKeyRange
        || window.msIDBKeyRange;
    }
  },


  /**
   * Adds an item to the database
   * @param {Object} data - The data for the item to be added
   * @param {String} storeName - The name of the object store to add the item to
   * @returns {Object} A promise with the created item's data
   */
  addItem(data, storeName) {
    const instance = this;

    return new Promise((resolve, reject) => {
      if (window.indexedDB && instance && instance.db) {
        const transaction = instance.db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.add(data);

        transaction.oncomplete = () => {
          resolve(data);
        };

        request.onerror = (event) => {
          reject(event);
        };
      } else {
        reject('Either no indexedDB property exists on the window or the instance is undefined');
      }
    });
  },


  /**
   * Gets an item to the database by its id
   * @param {String} id - The id of the item to find
   * @param {String} storeName - The name of the object store
   * to get the item from
   * @returns {Object} A promise with the item
   */
  getItemById(id, storeName) {
    const instance = this;

    return new Promise((resolve, reject) => {
      if (window.indexedDB && instance && instance.db) {
        const transaction = instance.db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(id);

        transaction.oncomplete = () => {
          const result = request.result;

          resolve(result);
        };

        request.onerror = (event) => {
          reject(event);
        };
      } else {
        reject('Either no indexedDB property exists on the window or the instance is undefined');
      }
    });
  },


  /**
   * Updates an item in the database by its id
   * @param {String} id - The id of the item to update
   * @param {Object} data - The data to update, will be merged
   * with the existing item data
   * @param {String} storeName - The name of the object store
   * to update the item in
   * @returns {Object} A promise with the updated item's data
   */
  updateItemById(id, data, storeName) {
    const instance = this;

    return new Promise((resolve, reject) => {
      if (window.indexedDB && instance && instance.db) {
        indexedDB.getItemById(id, storeName)
        .then((result) => {
          const transaction = instance.db.transaction([storeName], 'readwrite');
          const objectStore = transaction.objectStore(storeName);
          const newData = Object.assign(result, data);
          const updateRequest = objectStore.put(newData);

          transaction.oncomplete = () => {
            resolve(newData);
          };

          updateRequest.onerror = (event) => {
            reject(event);
          };
        })
        .catch((error) => {
          reject(error);
        });
      } else {
        reject('Either no indexedDB property exists on the window or the instance is undefined');
      }
    });
  },


  /**
   * Gets all items from an object store
   * @param {String} storeName - The name of the object store
   * @returns {Object} A promise with the created item's data
   */
  getAll(storeName) {
    const instance = this;

    return new Promise((resolve, reject) => {
      if (window.indexedDB && instance && instance.db) {
        const transaction = instance.db.transaction([storeName], 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const cursorRequest = objectStore.openCursor();
        const items = [];

        transaction.oncomplete = () => {
          resolve(items);
        };

        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;

          if (cursor) {
            items.push(cursor.value);
            cursor.continue();
          }
        };

        cursorRequest.onerror = (event) => {
          reject(event);
        };
      } else {
        reject('Either no indexedDB property exists on the window or the instance is undefined');
      }
    });
  },


  /**
   * Deletes an item from an object store
   * @param {String} id - The id of the item to delete
   * @param {String} storeName - The name of the object store
   * @returns {Object} A promise with the created item's data
   */
  deleteItem(id, storeName) {
    const instance = this;

    return new Promise((resolve, reject) => {
      if (window.indexedDB && instance && instance.db) {
        const transaction = instance.db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(id);

        transaction.oncomplete = () => {
          resolve('Item successfully deleted');
        };

        request.onerror = (event) => {
          reject(event);
        };
      } else {
        reject('Either no indexedDB property exists on the window or the instance is undefined');
      }
    });
  },


  /**
   * Deletes all data from an object store
   * @param {String} storeName - The name of the object store
   * @returns {Object} A promise with the created item's data
   */
  deleteAll(storeName) {
    const instance = this;

    return new Promise((resolve, reject) => {
      if (window.indexedDB && instance && instance.db) {
        const transaction = instance.db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.clear();

        transaction.oncomplete = () => {
          resolve('All data successfully deleted');
        };

        request.onerror = (event) => {
          reject(event);
        };
      } else {
        reject('Either no indexedDB property exists on the window or the instance is undefined');
      }
    });
  },


  /**
   * Creates object stores and indexes based on the schema objects
   * @param {Object} dbInstance - The current indexeddb instance
   * @returns {undefined} undefined
   */
  createSchema(dbInstance) {
    for (let i = 0; i < this.schemas.length; i++) {
      const options = this.schemas[i].keyPath
        ? { keyPath: this.schemas[i].keyPath }
        : { autoIncrement: true };
      const objectStore =
        dbInstance.createObjectStore(this.schemas[i].name, options);

      for (let j = 0; j < this.schemas[i].fields.length; j++) {
        const field = this.schemas[i].fields[j];

        objectStore.createIndex(field.name, field.name, { unique: field.unique });
      }
    }
  },
};

export default indexedDB;
