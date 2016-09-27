import React, { PropTypes } from 'react';
import colors from '../../palette';
import * as SpanCalc from './SpanCalculator';
import './BranchProfile.scss';

/**
 * Gets styling for the branch-info spans
 */
function infoSpanStyle(flex, backgroundColor) {
  if (flex === 0) {
    return { display: 'none' };
  }
  return { backgroundColor, flex };
}

const BranchProfile = ({
  type,
  start,
  end,
  max,
  branchStart,
  branchEnd,
  activeStateIndex: activeIndex,
  successorStateIndex: successorIndex,
  pinnedStateIndex: pinnedIndex,
}) => {
  const infoSpans = SpanCalc.getSpans(
    type,
    max,
    start,
    end,
    branchStart,
    branchEnd,
    activeIndex,
    successorIndex,
    pinnedIndex
  );
  const spanComponents = infoSpans
    .map(s => infoSpanStyle(s.length, colors[s.type]))
    .map((style, index) => (<div key={`branchinfo:${index}`} style={style} />));

  return (
    <div className="history-branch-profile">
      {spanComponents}
    </div>
  );
};

BranchProfile.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  branchStart: PropTypes.number,
  branchEnd: PropTypes.number,
  max: PropTypes.number.isRequired,
  activeStateIndex: PropTypes.number,
  pinnedStateIndex: PropTypes.number,
  successorStateIndex: PropTypes.number,
  type: PropTypes.oneOf(['current', 'legacy']).isRequired,
};

export default BranchProfile;
