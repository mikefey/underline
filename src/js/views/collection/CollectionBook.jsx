import React from 'react';
import { Link } from 'react-router';
import stringHelper from 'libs/string/string-helper';
import style from './CollectionBook.scss';


/**
 * Component for each book in the collection
 */
const CollectionBook = (props) => {
  /**
   * Returns max length for title and author text
   * @returns {Number} - Max length for title and author text
   */
  const getTextMaxLength = () => {
    const windowWidth = props.windowSize.width;
    let maxLength = 18;

    if (windowWidth > 320) {
      maxLength = 22;
    }

    if (windowWidth >= 400) {
      maxLength = 26;
    }

    if (windowWidth >= 500) {
      maxLength = 34;
    }

    if (windowWidth >= 600) {
      maxLength = 44;
    }

    if (windowWidth >= 700) {
      maxLength = 54;
    }

    if (windowWidth >= 768) {
      maxLength = 60;
    }

    return maxLength;
  };


  /**
   * Renders cover image or placeholder if no cover exists
   * @returns {ReactElement} - A cover image or placeholder
   */
  const renderCover = () => {
    let element;

    if (props.data.cover_image && props.data.cover_image.length) {
      element = (
        <img
          alt={props.data.title}
          src={props.data.cover_image}
        />
      );
    } else {
      const firstLetter = props.data.title && props.data.title.length
        ? props.data.title[0].toUpperCase()
        : '';
      element = (
        <div className={style.imagePlaceholder}>{firstLetter}</div>
      );
    }

    return element;
  };


  /**
   * Click handler for 'remove' button
   * @returns {undefined} undefined
   */
  const onRemoveButtonClick = () => {
    props.removeButtonClickHandler(props.data.id);
  };

  const textMaxLength = getTextMaxLength();
  let title = props.data.title;
  let author = props.data.author;

  if (title.length > textMaxLength) {
    title = stringHelper.truncate(title, textMaxLength - 3, '...');
  }

  if (author.length > textMaxLength) {
    author = stringHelper.truncate(author, textMaxLength - 3, '...');
  }

  const progressStyle = {
    width: `${props.data.current_location.percentage * 100}%`,
  };

  return (
    <div className={style.wrapper}>
      <Link to={`/book/${props.data.id}`} className={style.button}>
        <div className={style.imageWrapper}>
          {renderCover()}
        </div>
        <div className={style.textWrapper}>
          <h2 className={style.title}>{title}</h2>
          <div className={style.author}>{author}</div>
        </div>
        <div className={style.progressWrapper}>
          <div className={style.progressBack} />
          <div style={progressStyle} className={style.progress} />
        </div>
      </Link>
      <button
        className={style.removeButton}
        onClick={onRemoveButtonClick}
      >
        <div className={style.removeButtonIcon}>
          <div className={style.removeButtonIconLine} />
          <div className={style.removeButtonIconLineTwo} />
        </div>
      </button>
    </div>
  );
};


/**
 * PropTypes
 * @prop {Object} data - An object with a book's metadata
 * @prop {Function} removeButtonClickHandler - A click handler for the
 * @prop {Object} windowSize - An object holding the width and height of the
 * window
 */
CollectionBook.propTypes = {
  data: React.PropTypes.object.isRequired,
  removeButtonClickHandler: React.PropTypes.func.isRequired,
  windowSize: React.PropTypes.object.isRequired,
};

export default CollectionBook;
