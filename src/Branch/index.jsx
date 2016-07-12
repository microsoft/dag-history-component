const log = require('debug')('dag-history-component:components:Branch');

import React, { PropTypes } from 'react';
import BranchProfile from '../BranchProfile';
import ItemInfo from '../ItemInfo';
const DO_NOTHING = () => ({});

const Branch = ({
  label,
  continuation,
  branchType,
  startsAt,
  endsAt,
  currentBranchStart,
  currentBranchEnd,
  maxDepth,
  activeStateIndex,
  onClick,
  onContinuationClick,
  active,
}) => (
  <div className="history-branch" onClick={onClick || DO_NOTHING}>
    <div className="history-branch-profile-container">
      <BranchProfile
        start={startsAt}
        end={endsAt}
        max={maxDepth}
        currentBranchStart={currentBranchStart}
        currentBranchEnd={currentBranchEnd}
        type={branchType}
        activeStateIndex={activeStateIndex}
      />
    </div>
    <div className="branch-details">
      <ItemInfo
        continuation={continuation}
        label={label}
        onContinuationClick={onContinuationClick || DO_NOTHING}
        active={active}
      />
    </div>
  </div>
);

Branch.propTypes = {
  label: PropTypes.string.isRequired,
  activeStateIndex: PropTypes.number,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired,
  startsAt: PropTypes.number.isRequired,
  endsAt: PropTypes.number.isRequired,
  maxDepth: PropTypes.number.isRequired,
  currentBranchStart: PropTypes.number,
  currentBranchEnd: PropTypes.number,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
  active: PropTypes.bool,
};

export default Branch;
