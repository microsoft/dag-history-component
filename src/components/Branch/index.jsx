import React, { PropTypes } from 'react';
import classnames from 'classnames';
import BranchProfile from '../BranchProfile';
import './Branch.scss';

const DO_NOTHING = () => ({});

const Branch = ({
  label,
  branchType,
  startsAt,
  endsAt,
  currentBranchStart,
  currentBranchEnd,
  maxDepth,
  activeStateIndex,
  onClick,
  active,
  successorDepth,
  pinnedStateIndex,
}) => (
  <div className="history-branch" onClick={onClick || DO_NOTHING}>
    <div className="history-branch-profile-container">
      <BranchProfile
        start={startsAt}
        end={endsAt}
        max={maxDepth}
        pinnedStateIndex={pinnedStateIndex}
        branchStart={currentBranchStart}
        branchEnd={currentBranchEnd}
        type={branchType}
        successorStateIndex={successorDepth}
        activeStateIndex={activeStateIndex}
      />
    </div>
    <div className="branch-details">
      <div className={classnames('branch-name', { active })}>
        {label}
      </div>
    </div>
  </div>
);

Branch.propTypes = {
  label: PropTypes.string.isRequired,
  activeStateIndex: PropTypes.number,
  startsAt: PropTypes.number.isRequired,
  endsAt: PropTypes.number.isRequired,
  maxDepth: PropTypes.number.isRequired,
  pinnedStateIndex: PropTypes.number,
  successorDepth: PropTypes.number,
  currentBranchStart: PropTypes.number,
  currentBranchEnd: PropTypes.number,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  onClick: PropTypes.func,
  onRename: PropTypes.func,
  active: PropTypes.bool,
};

export default Branch;
