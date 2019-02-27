import React from 'react';
import PropTypes from 'prop-types';
import Header from 'ui/header/Header.jsx';
import CloseButton from 'ui/close-button/CloseButton.jsx';
import TableOfContentsButton from './TableOfContentsButton.jsx';
import style from './TableOfContents.scss';


/**
 * Table of contents view component
 * @param {Object} props - The component props
 */
const TableOfContents = (props) => {
  const data = props.tableOfContentsState.data;
  const wrapperClass = props.tableOfContentsState.show
    ? style.wrapperShowing
    : style.wrapper;


  /**
   * Renders button components
   * @returns {Array<ReactElement>} Buttons for each chapter
   */
  const renderButtons = () => {
    let buttons = [];

    if (data) {
      buttons = data.map((item) => {
        const clickHandler = () => {
          props.tableOfContentsButtonClicked(item.href);
          props.hideTableOfContents();
        };

        return (
          <TableOfContentsButton
            data={item}
            key={`toc-section-button-${item.href}`}
            clickHandler={clickHandler}
          />
        );
      });
    }

    return buttons;
  };

  return (
    <div className={wrapperClass}>
      <Header
        rightButton={
          <CloseButton
            clickHandler={props.hideTableOfContents}
          />
        }
        text='Table Of Contents'
      />
      <div className={style.buttonsWrapper}>
        {renderButtons()}
      </div>
    </div>
  );
};


/**
 * PropTypes
 * @prop {Function} hideTableOfContents - Function to dispatch a
 * HIDE_TABLE_OF_CONTENTS action
 * @prop {Object} tableOfContentsState - The table of contents state in the
 * store
 */
TableOfContents.propTypes = {
  hideTableOfContents: PropTypes.func.isRequired,
  tableOfContentsState: PropTypes.object.isRequired,
};

export default TableOfContents;
