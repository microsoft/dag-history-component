import React, { PropTypes } from 'react';
import Branch from '../Branch';
import './BranchList.scss';

const DO_NOTHING = () => ({});

const BranchList = ({
  activeBranch,
  branches,
  onBranchClick,
  onBranchContinuationClick,
}) => {
  const branchViews = branches.map(s => (
    <Branch
      {...s}
      key={`branch:${s.id}`}
      onClick={() => (onBranchClick || DO_NOTHING)(s.id)}
      onContinuationClick={() => (onBranchContinuationClick || DO_NOTHING)(s.id)}
      active={activeBranch === s.id}
    />
  ));
  return (
    <div className="history-branch-list">
      <div className="history-branch-list-inner">
        {branchViews}
      </div>
    </div>
  );
};

BranchList.propTypes = {
  activeBranch: PropTypes.number.isRequired,
  onBranchClick: PropTypes.func,
  onBranchContinuationClick: PropTypes.func,
  branches: PropTypes.arrayOf(React.PropTypes.shape({
    ...Branch.propTypes,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default BranchList;
