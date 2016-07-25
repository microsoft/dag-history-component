import React, { PropTypes } from 'react';
import BranchProfile from '../BranchProfile';
import ItemInfo from '../ItemInfo';
const DO_NOTHING = () => ({});
require('./Branch.sass');

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
  itemKey,
  successorDepth,
  continuationActive,
}) => (
  <div className="history-branch" onClick={onClick || DO_NOTHING}>
    <div className="history-branch-profile-container">
      <BranchProfile
        start={startsAt}
        end={endsAt}
        max={maxDepth}
        branchStart={currentBranchStart}
        branchEnd={currentBranchEnd}
        type={branchType}
        successorStateIndex={successorDepth}
        activeStateIndex={activeStateIndex}
      />
    </div>
    <div className="branch-details">
      <ItemInfo
        itemKey={itemKey}
        continuation={continuation}
        label={label}
        onContinuationClick={onContinuationClick || DO_NOTHING}
        active={active}
        continuationActive={continuationActive}
      />
    </div>
  </div>
);

Branch.propTypes = {
  itemKey: PropTypes.string,
  label: PropTypes.string.isRequired,
  activeStateIndex: PropTypes.number,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired,
  startsAt: PropTypes.number.isRequired,
  endsAt: PropTypes.number.isRequired,
  maxDepth: PropTypes.number.isRequired,
  successorDepth: PropTypes.number,
  currentBranchStart: PropTypes.number,
  currentBranchEnd: PropTypes.number,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
  active: PropTypes.bool,
  continuationActive: PropTypes.bool,
};

export default Branch;
