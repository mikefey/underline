import {
  UPDATE_TABLE_OF_CONTENTS,
  SHOW_TABLE_OF_CONTENTS,
  HIDE_TABLE_OF_CONTENTS,
  TABLE_OF_CONTENTS_BUTTON_CLICKED,
} from './table-of-contents-constants';


/**
 * Returns an UPDATE_TABLE_OF_CONTENTS action object
 * @return {Object} An action object
 */
const updateTableOfContents = (data) => {
  return {
    type: UPDATE_TABLE_OF_CONTENTS,
    data,
  };
};


/**
 * Returns a SHOW_TABLE_OF_CONTENTS action object
 * @return {Object} An action object
 */
const showTableOfContents = () => {
  return {
    type: SHOW_TABLE_OF_CONTENTS,
  };
};


/**
 * Returns a HIDE_TABLE_OF_CONTENTS action object
 * @return {Object} An action object
 */
const hideTableOfContents = () => {
  return {
    type: HIDE_TABLE_OF_CONTENTS,
  };
};


/**
 * Returns a TABLE_OF_CONTENTS_BUTTON_CICKED action object
 * @param {Number} index - The index of the clicked button
 * @return {Object} An action object
 */
const tableOfContentsButtonClicked = (index) => {
  return {
    type: TABLE_OF_CONTENTS_BUTTON_CLICKED,
    index,
  };
};

export {
  updateTableOfContents,
  showTableOfContents,
  hideTableOfContents,
  tableOfContentsButtonClicked,
};
