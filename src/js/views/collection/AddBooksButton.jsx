import React from 'react';
import DropboxChooser from 'react-dropbox-chooser';
import config from 'config';
import style from './AddBooksButton.scss';


/**
 * Add books button component
 */
const AddBooksButton = (props) => {
  /**
   * Handler for successful download of file(s) from Dropbox
   * @param {Array<Object>} files - An array of objects with downloaded file data
   */
  const onDropboxFileSuccess = (files) => {
    if (files.length) {
      props.downloadBook(files[0].link);
    }
  };


  return (
    <div className={style.wrapper}>
      <DropboxChooser
        appKey={config.dropbox.appKey}
        success={files => onDropboxFileSuccess(files)}
        multiselect={false}
        extensions={['.epub']}
        linkType={'direct'}
      >
        <div className={style.icon} />
      </DropboxChooser>
    </div>
  );
};


/**
 * PropTypes
 * @prop {Function} downloadBook - function to dispatch a DOWNLOAD_BOOK action
 */
AddBooksButton.propTypes = {
  downloadBook: React.PropTypes.func.isRequired,
};

export default AddBooksButton;
