/**
 * Utility functions for working with strings
 */
const stringHelper = {
  /**
   * Truncates a string
   * @param {String} string - The string to truncate
   * @param {Number} characterCount - The number of characters to truncate the
   * the string to
   * @param {String} trailingCharacters - Trailing characters to put after the
   * truncated string (i.e. '...')
   * @param {String} - The truncated string
   */
  truncate(string, characterCount, trailingCharacters) {
    let newString = string;

    newString = string.substr(0, characterCount);

    if (trailingCharacters) {
      newString += trailingCharacters;
    }

    return newString;
  },
};

export default stringHelper;
