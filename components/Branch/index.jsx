import React, { PropTypes } from 'react';
import Continuation from '../Continuation';
import BranchProfile from '../BranchProfile';

require('./Branch.sass');

const NA_COLOR = 'grey';
const branchColor = () => 'red';

function branchStyle(color, startsAt, endsAt) {
  if (startsAt === endsAt) {
    return { display: 'none' };
  }

  const flex = endsAt - startsAt;
  return {
    backgroundColor: color,
    flex,
  };
}

const Branch = ({
  label,
  numContinuations,
  isContinuationSelected,
  branchType,
  startsAt,
  endsAt,
  maxDepth,
}) => (
  <div className="history-branch">
    <div className="history-branch-profile-container">
      <BranchProfile start={startsAt} end={endsAt} maxLength={maxDepth} type={branchType} />
    </div>
    <div className="branch-details">
      <Continuation numContinuations={numContinuations} isSelected={isContinuationSelected} />
      <span className="history-branch-label">{label}</span>
    </div>
  </div>
);

Branch.propTypes = {
  label: PropTypes.string.isRequired,
  numContinuations: PropTypes.number,
  isContinuationSelected: PropTypes.bool,
  startsAt: PropTypes.number.isRequired,
  endsAt: PropTypes.number.isRequired,
  maxDepth: PropTypes.number.isRequired,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
};

export default Branch;
