const log = require('debug')('dag-history-component:components:BranchProfile');
import React, { PropTypes } from 'react';
import { colors } from '../palette';

const branchColor = (type, loc) => {
  let result;
  if (type === 'current') {
    result = colors.CURRENT;
  } else if (loc === 'pre') {
    result = colors.ANCESTOR;
  } else {
    result = colors.UNRELATED;
  }
  return result;
};

const activeBranchColor = (type) => type === 'current' ? colors.CURRENT_ACTIVE : colors.LEGACY_ACTIVE; // eslint-disable-line

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

function activeInfoSpans(start, end, currentBranchStart, currentBranchEnd, type, activeStateIndex) {
  let result;
  if (!activeStateIndex && activeStateIndex !== 0) {
    // Case 1 No activeStateIndex
    const ancestorLength = (currentBranchEnd || end) - (currentBranchStart || start) + 1;
    const totalLength = end - start + 1;
    const unrelatedLength = totalLength - ancestorLength;
    result = [
      infoSpanStyle(branchColor(type, 'pre'), ancestorLength),
      infoSpanStyle(branchColor(type, 'post'), unrelatedLength),
    ];
  } else {
    const afterActiveLength = end - activeStateIndex;
    const unrelatedLength = end - (currentBranchEnd || activeStateIndex);
    const ancestralLength = afterActiveLength - unrelatedLength;
    result = [
      infoSpanStyle(branchColor(type, 'pre'), activeStateIndex - start),
      infoSpanStyle(activeBranchColor(type), 1),
      infoSpanStyle(branchColor(type, 'pre'), ancestralLength),
      infoSpanStyle(branchColor(type, 'post'), unrelatedLength),
    ];
  }
  return result;
}

const BranchProfile = ({
  type,
  start,
  end,
  max,
  currentBranchStart,
  currentBranchEnd,
  activeStateIndex,
}) => {
  const infoSpans = [
    // state depths that occur before this branch was created
    infoSpanStyle(colors.NONE, start),

    // the colored spans for this branch
    ...activeInfoSpans(start, end, currentBranchStart, currentBranchEnd, type, activeStateIndex),

    // state depths after this branch was inactive
    infoSpanStyle(colors.NONE, max - end),
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
  currentBranchStart: PropTypes.number.isRequired,
  currentBranchEnd: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  activeStateIndex: PropTypes.number,
  type: PropTypes.oneOf(['current', 'legacy']).isRequired,
  paths: PropTypes.shape({
    color: PropTypes.string.isRequired,
    ingressEars: PropTypes.arrayOf(PropTypes.number),
    egressEars: PropTypes.arrayOf(PropTypes.number),
    traversal: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }),
    verticals: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default BranchProfile;
