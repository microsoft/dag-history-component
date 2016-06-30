import React, { PropTypes } from 'react';
require('./BranchProfile.sass');

const NA_COLOR = 'transparent';
const branchColor = (type) => type === 'current' ? '#B3E4F5' : '#E3E3E3'; // eslint-disable-line

/**
 * Gets styling for the branch-info spans
 */
function infoSpanStyle(backgroundColor, start, end) {
  if (start === end) {
    return { display: 'none' };
  }
  const flex = end - start;
  return {
    backgroundColor,
    flex,
  };
}

const BranchProfile = ({
  type,
  start,
  end,
  maxLength,
}) => (
  <div className="history-branch-profile">
    <div style={infoSpanStyle(NA_COLOR, 0, start || 0)} />
    <div style={infoSpanStyle(branchColor(type), start || 0, end || 0)} />
    <div style={infoSpanStyle(NA_COLOR, end || 0, maxLength)} />
  </div>
);

BranchProfile.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  maxLength: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['current', 'legacy']).isRequired,
};

export default BranchProfile;
