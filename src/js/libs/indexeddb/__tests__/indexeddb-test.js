import test from 'ava';
import fakeIndexedDB from 'fake-indexeddb';
import indexeddb from './../indexeddb.js';
import bookFixture from './../../../../../test/fixtures/book';
import bookSchemaFixture from './../../../../../test/fixtures/book-schema';

test.serial('indexeddb lib returns an error if the indexedDB property doesn\'t exist', (t) => {
  window.indexedDB = null;

  return indexeddb.init('books-database-test', 1, [bookSchemaFixture])
  .catch((error) => {
    t.is(error, 'No indexedDB property exists on the window');
  });
});

test.serial('indexeddb lib saves data', (t) => {
  window.indexedDB = fakeIndexedDB;

  return indexeddb.init('books-database-test', 1, [bookSchemaFixture])
  .then((instance) => {
    t.is(typeof instance, 'object');

    return indexeddb.addItem(bookFixture, 'books')
    .then((data) => {
      t.deepEqual(data, bookFixture);
    });
  });
});

test.serial('indexeddb lib gets item by id', (t) => {
  return indexeddb.getItemById(bookFixture.id, 'books')
  .then((data) => {
    t.deepEqual(data, bookFixture);
  });
});

test.serial('indexeddb lib updates data by id', (t) => {
  const updatedData = Object.assign(bookFixture, { parsed_data: 'arrayBuffer' });

  return indexeddb.updateItemById(bookFixture.id, updatedData, 'books')
  .then((data) => {
    t.deepEqual(data, updatedData);
  });
});


test.serial('indexeddb gets all items in store', (t) => {
  const updatedData = Object.assign(bookFixture, { parsed_data: 'arrayBuffer' });

  return indexeddb.getAll('books')
  .then((data) => {
    t.deepEqual(data, [updatedData]);
  });
});
