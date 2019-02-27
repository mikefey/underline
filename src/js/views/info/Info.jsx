import React from 'react';
import PropTypes from 'prop-types';
import Header from 'ui/header/Header.jsx';
import CloseButton from 'ui/close-button/CloseButton.jsx';
import style from './Info.scss';

/**
 * Info component
 * @param {Object} props - The component props
 */
const Info = (props) => {
  const wrapperClass = props.infoState.show
    ? style.wrapperShowing
    : style.wrapper;

  return (
    <div className={wrapperClass}>
      <Header
        rightButton={
          <CloseButton
            clickHandler={props.hideInfo}
          />
        }
        text='Underline'
      />
      <div className={style.contentWrapper}>
        <div className={style.infoBlock}>
          <div className={style.title}>Contact</div>
          <div className={style.content}>Mike Fey (<a href='mailto:mikefey@protonmail.com'>mikefey@protonmail.com</a>)</div>
        </div>
        <div className={style.infoBlock}>
          <div className={style.title}>Bugs</div>
          <div className={style.content}>Please open an issue or pull request at <a href='https://github.com/mikefey/underline'>https://github.com/mikefey/underline</a></div>
        </div>
        <div className={style.infoBlock}>
          <div className={style.title}>License</div>
          <div className={style.content}>This software is covered under the <a href='https://www.gnu.org/licenses/gpl-3.0.en.html'>GNU General Public License v3.0</a></div>
        </div>
        <div className={style.infoBlock}>
          <div className={style.title}>"Add" button icon credit:</div>
          <div className={style.content}>Icon made by <a href='http://picol.org/'>Picol</a> from <a href='http://flaticon.com'>flaticon.com</a></div>
        </div>
        <div className={style.infoBlock}>
          <div className={style.title}>Privacy</div>
          <div className={style.content}>
            <p className='statement'>Your privacy is critically important. Your personal information is not stored on our servers.</p>
            <p>It is Underline's policy to respect your privacy regarding any information we may collect while operating our app.</p>
            <strong>Website/App Visitors</strong>
            <p>Like most website/app operators, Underline collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Underline's purpose in collecting non-personally identifying information is to better understand how Underline's visitors use the app. From time to time, Underline may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of the app.</p>
            <strong>Gathering of Personally-Identifying Information</strong>
            <p>Certain visitors to Underline website/app choose to interact with Underline in ways that require Underline to gather personally-identifying information. The amount and type of information that Underline gathers depends on the nature of the interaction. Underline collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor's interaction with Underline. Underline does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website/app-related activities.</p>
            <strong>Aggregated Statistics</strong>
            <p>Underline may collect statistics about the behavior of visitors to its websites and app. However, Underline does not disclose personally-identifying information other than as described below.</p>
            <strong>IndexedDB</strong>
            <p>IndexedDB is a database that websites and apps use to store information on a visitor's computer. The visitor's browser provides that data to the website each time the visitor returns. Underline uses IndexedDB to store the app's data on the vistor's computer  .</p>
            <strong>Privacy Policy Changes</strong>
            <p>Although most changes are likely to be minor, Underline may change its Privacy Policy from time to time, and in Underline's sole discretion. Underline encourages visitors to frequently check this page for any changes to its Privacy Policy.</p>
            <p>Modified from <a href='http://automattic.com/'>Automattic</a> Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};


/**
 * PropTypes
 * @prop {Function} hideInfo - Function to dispatch a HIDE_INFO action
 * @prop {Object} infoState - The info state in the store
 */
Info.propTypes = {
  hideInfo: PropTypes.func.isRequired,
  infoState: PropTypes.object.isRequired,
};

export default Info;
