import React from 'react';
import style from './PlaceholderPage.scss';


/**
 * Component for a placeholder page that shows while the page data is loading
 * @param {Object} props - The component props
 */
const PlaceholderPage = (props) => {
  let positionClassName = style.left;
  if (props.right) {
    positionClassName = style.right;
  }
  const className = style.wrapper + ' ' + positionClassName;


  /**
   * Renders the lines
   * @returns {Array<ReactElement>} The line elements
   */
  const renderLines = () => {
    let counter = 0;
    let lineClass;
    const lines = [];
    const heightOffset = (window.innerWidth >= 650) ? 200 : 160;
    const paragraphAmount = Math.floor((window.innerHeight - heightOffset) /
      (8 * 16));
    const amount = paragraphAmount * 8;

    for (let i = 0; i < amount; i++) {
      lineClass = style.lineOne;
      counter++;

      if (counter > 8) {
        counter = 1;
      }

      if (counter === 8) {
        lineClass = style.lineTwo;
      }

      lines.push(
        <div
          className={lineClass}
          key={'line-' + i}
        />,
      );
    }

    return lines;
  };

  return (
    <div className={className}>
      {renderLines()}
    </div>
  );
};


PlaceholderPage.defaultProps = {
  left: true,
  right: false,
};


/**
 * PropTypes
 * @prop {Boolean} right - If the component is on the right side of the content
 */
PlaceholderPage.propTypes = {
  right: React.PropTypes.bool,
};

export default PlaceholderPage;
