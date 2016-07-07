const log = require('debug')('dag-history-component:components:History');
import DagGraph from 'redux-dag-history/lib/DagGraph';
import React, { PropTypes } from 'react';
import StateList from '../StateList';
import BranchList from '../BranchList';

const History = ({
  history,
  onBranchSelect,
  onStateSelect,
}) => {
  const historyGraph = new DagGraph(history.graph);

  const {
    currentBranch,
    currentStateId,
    branches,
    maxDepth,
  } = historyGraph;
  const latestCommitOnBranch = historyGraph.latestOn(currentBranch);
  const commitPath = historyGraph.commitPath(latestCommitOnBranch);
  const activeBranchStartsAt = historyGraph.branchStartDepth(currentBranch);

  // Determine what branches are on the commit path
  const branchPaths = {};
  const branchPath = commitPath.map(commit => historyGraph.branchOf(commit));
  branchPath.forEach((branch, index) => {
    if (branchPaths[branch]) {
      branchPaths[branch].end = index;
    } else {
      branchPaths[branch] = { start: index, end: index };
    }
  });

  const stateList = commitPath.map((id, index) => {
    const label = historyGraph.stateName(id);
    const branchType = index < activeBranchStartsAt ? 'legacy' : 'current';
    return {
      id,
      label,
      branchType,
      continuation: {
        numContinuations: historyGraph.childrenOf(id).length,
        isSelected: currentStateId === id,
      },
    };
  }).reverse();

  const branchList = branches.map(branch => {
    const activeStateIndex = historyGraph.depthIndexOf(branch, currentStateId);
    const startsAt = historyGraph.branchStartDepth(branch);
    const endsAt = historyGraph.branchEndDepth(branch);
    const branchType = currentBranch === branch ? 'current' : 'legacy';
    const label = historyGraph.getBranchName(branch);

    // Figure out where this branch intersects the commit path
    const myBranchPath = branchPaths[branch];
    const currentBranchStart = myBranchPath ? myBranchPath.start : null;
    const currentBranchEnd = myBranchPath ? myBranchPath.end : null;
    return {
      id: branch,
      label,
      activeStateIndex,
      continuation: {
        numContinuations: 0, // TODO
        isSelected: currentBranch === branch,
      },
      startsAt,
      endsAt,
      maxDepth,
      branchType,
      currentBranchStart,
      currentBranchEnd,
    };
  }).reverse();

  const onStateContinuationClick = (id) => log('state continuation clicked!', id);
  const onBranchContinuationClick = (id) => log('branch continuation clicked', id);

  return (
    <div className="history-container">
      <div className="state-list-container">
        <StateList
          activeStateId={currentStateId}
          states={stateList}
          onStateClick={onStateSelect}
          onStateContinuationClick={onStateContinuationClick}
        />
      </div>
      <div className="branch-list-container">
        <BranchList
          activeBranch={currentBranch}
          branches={branchList}
          onBranchClick={onBranchSelect}
          onBranchContinuationClick={onBranchContinuationClick}
        />
      </div>
    </div>
  );
};

History.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired,

  /**
   * User Interaction Handlers
   */
  onBranchSelect: PropTypes.func.isRequired,
  onStateSelect: PropTypes.func.isRequired,
};
export default History;
