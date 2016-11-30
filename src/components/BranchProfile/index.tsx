import * as React from "react";
import colors from '../../palette';
import * as SpanCalc from './SpanCalculator';
import './BranchProfile.scss';

const { PropTypes } = React;

/**
 * Gets styling for the branch-info spans
 */
function infoSpanStyle(flex, backgroundColor) {
  if (flex === 0) {
    return { display: 'none' };
  }
  return { backgroundColor, flex };
}

export interface IBranchProfileProps {
  start: number;
  end: number;
  branchStart: number;
  branchEnd: number;
  max: number;
  activeStateIndex: number;
  pinnedStateIndex: number;
  successorStateIndex: number;
  type: 'current' | 'legacy';
}

const BranchProfile: React.StatelessComponent<IBranchProfileProps> = ({
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
