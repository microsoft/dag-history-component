import React, { PropTypes } from 'react';
require('./BranchProfile.sass');

const NA_COLOR = 'transparent';
const branchColor = (type) => type === 'current' ? '#B3E4F5' : '#E3E3E3'; // eslint-disable-line
const activeBranchColor = (type) => type === 'current' ? '#4DD2FF' : '#BFBFBF'; // eslint-disable-line

/**
 * Gets styling for the branch-info spans
 */
function infoSpanStyle(backgroundColor, flex) {
  if (flex === 0) {
    return { display: 'none' };
  }
  return {
    backgroundColor,
    flex,
  };
}

function activeInfoSpans(start, end, type, activeStateIndex) {
  let result;
  const spanLength = end - start + 1;

  if (!activeStateIndex && activeStateIndex !== 0) {
    result = [infoSpanStyle(branchColor(type), spanLength)];
  } else if (activeStateIndex === start) {
    result = [
      infoSpanStyle(activeBranchColor(type), 1),
      infoSpanStyle(branchColor(type), spanLength - 1),
    ];
  } else if (activeStateIndex === end) {
    result = [
      infoSpanStyle(branchColor(type), spanLength - 1),
      infoSpanStyle(activeBranchColor(type), 1),
    ];
  } else {
    result = [
      infoSpanStyle(branchColor(type), activeStateIndex - start),
      infoSpanStyle(activeBranchColor(type), 1),
      infoSpanStyle(branchColor(type), end - activeStateIndex),
    ];
  }
  return result;
}

const BranchProfile = ({
  type,
  start,
  end,
  max,
  activeStateIndex,
}) => {
  const infoSpans = [
    // state depths that occur before this branch was created
    infoSpanStyle(NA_COLOR, start),

    // the colored spans for this branch
    ...activeInfoSpans(start, end, type, activeStateIndex),

    // state depths after this branch was inactive
    infoSpanStyle(NA_COLOR, max - end),
  ].map((style, index) => (
    <div key={`branchinfo:${index}`} style={style} />
  ));
  return (
    <div className="history-branch-profile">
      {infoSpans}
    </div>
  );
};

BranchProfile.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  activeStateIndex: PropTypes.number,
  type: PropTypes.oneOf(['current', 'legacy']).isRequired,
};

export default BranchProfile;
