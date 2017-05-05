/**
 * Library for working with .epub files,
 * uses epub.js (https://github.com/futurepress/epub.js/)
 */
const epub = {
  /**
   * Loads an epub file and retrieves its contents
   * @param {Object} file - An epub file, in Blob format
   * @returns {Object} A promise with the loaded book data
   */
  loadBook(file) {
    return new Promise((resolve, reject) => {
      const book = window.ePub(file, { restore: true });

      book.opened.then(() => {
        resolve(book);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },


  /**
   * Loads a book and parses it to get the title, author, cover, and an array of
   * epub location data
   * @param {Object} file - An epub file, in Blob format
   * @returns {Object} A promise with the parsed book data
   */
  getBookData(file) {
    return new Promise((resolve, reject) => {
      epub.loadBook(file)
      .then((book) => {
        book.loaded.metadata.then((meta) => {
          epub.getLocationData(book)
          .then(() => {
            const coverImage = epub.getCoverImage(book);
            const bookData = {
              title: meta.title,
              author: meta.creator,
              cover_image: coverImage,
              locations: book.locations._locations,
            };

            resolve(bookData);
          })
          .catch((error) => {
            reject(error);
          });
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  },


  /**
   * Gets an array of locations for the epub, based on
   * cfi format (http://www.idpf.org/epub/linking/cfi/epub-cfi.html)
   * @param {Object} file - An epub file, in Blob format
   * @returns {Object} A promise with the parsed book data
   */
  getLocationData(book) {
    return new Promise((resolve, reject) => {
      book.locations.generate()
      .then(() => {
        resolve(book);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },


  /**
   * Gets a book's cover image
   * @param {Object} book - An epubjs instance representing the book
   * @returns {Object} A promise with the parsed book data
   */
  getCoverImage(book) {
    let coverImage;

    if (book.archive && book.archive.urlCache) {
      Object.keys(book.archive.urlCache).forEach((key) => {
        if (key === book.cover) {
          coverImage = book.archive.urlCache[book.cover];
        }
      });
    }

    return coverImage;
  },
};

export default epub;
