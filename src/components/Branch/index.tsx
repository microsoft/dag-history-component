import * as React from 'react';
import * as classnames from 'classnames';
import BranchProfile from '../BranchProfile';
import './Branch.scss';

export interface IBranchProps {
  id: number;
  label: string;
  branchType: 'current' | 'legacy';
  startsAt: number;
  endsAt: number;
  currentBranchStart: number;
  currentBranchEnd: number;
  maxDepth: number;
  activeStateIndex: number;
  onClick: React.EventHandler<React.MouseEvent<any>>;
  active: boolean;
  successorDepth: number;
  pinnedStateIndex: number;
}

const Branch: React.StatelessComponent<IBranchProps> = ({
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
  <div className="history-branch" onClick={e => onClick ? onClick(e) : undefined}>
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
  id: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
  branchType: React.PropTypes.string.isRequired,
  startsAt: React.PropTypes.number.isRequired,
  endsAt: React.PropTypes.number.isRequired,
  currentBranchStart: React.PropTypes.number,
  currentBranchEnd: React.PropTypes.number,
  maxDepth: React.PropTypes.number.isRequired,
  activeStateIndex: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool,
  successorDepth: React.PropTypes.number,
  pinnedStateIndex: React.PropTypes.number,
};

export default Branch;
