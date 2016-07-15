const log = require('debug')('dag-history-component:components:History');
import DagGraph from 'redux-dag-history/lib/DagGraph';
import React, { PropTypes } from 'react';
import StateList from '../StateList';
import BranchList from '../BranchList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import OptionDropdown from '../OptionDropdown';

const {
    jumpToState,
    jumpToBranch,
    load,
    clear,
} = DagHistoryActions;

function getStateList(historyGraph, commitPath) {
  const { currentBranch, currentStateId } = historyGraph;
  const activeBranchStartsAt = historyGraph.branchStartDepth(currentBranch);
  return commitPath.map((id, index) => {
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
}

function getBranchList(historyGraph, commitPath) {
  const {
    branches,
    maxDepth,
    currentBranch,
    currentStateId,
  } = historyGraph;


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

  return branches.sort((a, b) => a - b).reverse().map(branch => {
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
  });
}

const History = ({
  history,

  // Redux-Connected Props
  onBranchSelect,
  onStateSelect,
  onLoad,
  onClear,

  // Control Bar Config
  controlBar: {
    onSaveHistory,
    onLoadHistory,
    onConfirmClear,
    show: showControlBar,
  },

  // Bookmarks Config
  bookmarks: {
    show: showBookmarks,
  },
}) => {
  const historyGraph = new DagGraph(history.graph);
  const { currentBranch, currentStateId } = historyGraph;
  const latestCommitOnBranch = historyGraph.latestOn(currentBranch);
  const commitPath = historyGraph.commitPath(latestCommitOnBranch);

  const onStateContinuationClick = (id) => log('state continuation clicked!', id);
  const onBranchContinuationClick = (id) => log('branch continuation clicked', id);

  const onSaveClicked = () => {
    const { current, lastBranchId, lastStateId, graph } = history;
    // Pass the plain history up to the client
    onSaveHistory({
      current,
      lastBranchId,
      lastStateId, graph: graph.toJS(),
    });
  };

  const onLoadClicked = () => {
    log('loading history');
    if (!onLoadHistory) {
      throw new Error("Cannot load history, 'onLoadHistory' must be defined");
    }
    Promise.resolve(onLoadHistory()).then(state => {
      if (!state) {
        throw new Error("'onLoadHistory' must return either a state graph object or a promise that resolves to a state graph object"); // eslint-disable-line
      }
      onLoad(state);
    });
    onLoadHistory();
  };

  const onClearClicked = () => {
    log('clearing history');
    const doConfirm = onConfirmClear || (() => true);
    return Promise.resolve(doConfirm()).then(confirmed => confirmed && onClear());
  };

  const onBookmarksClicked = () => {
    log('switch to bookmarks');
  };

  return (
    <div className="history-container">
      <div className="history-control-bar">
        <OptionDropdown label="History" options={[]} />
        {
          <OptionDropdown
            contentStyle={{ right: 0 }}
            options={showControlBar ? [
              { label: 'Save', onClick: onSaveClicked },
              { label: 'Load', onClick: onLoadClicked },
              { label: 'Clear', onClick: onClearClicked },
            ] : []}
          />
        }
      </div>
      <div className="state-list-container">
        <StateList
          activeStateId={currentStateId}
          states={getStateList(historyGraph, commitPath)}
          onStateClick={onStateSelect}
          onStateContinuationClick={onStateContinuationClick}
          renderBookmarks={showBookmarks}
        />
      </div>
      <div className="branch-list-container">
        <div className="history-control-bar">
          <OptionDropdown
            label="Branches"
            options={[
             { label: 'Bookmarks', onClick: onBookmarksClicked },
            ]}
          />
          <OptionDropdown options={[]} />
        </div>
        <BranchList
          activeBranch={currentBranch}
          branches={getBranchList(historyGraph, commitPath)}
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
   * User Interaction Handlers - loaded by redux
   */
  onBranchSelect: PropTypes.func,
  onStateSelect: PropTypes.func,
  onLoad: PropTypes.func,
  onClear: PropTypes.func,

  /**
   * ControlBar Configuration Properties
   */
  controlBar: PropTypes.shape({
    /**
     * Whether or not to show the control bar
     */
    show: PropTypes.bool,
    /**
     * A handler to save the history tree out. This is handled by clients.
     */
    onSaveHistory: PropTypes.func,

    /**
     * A handler to retrieve the history tree. This is handled by clients
     */
    onLoadHistory: PropTypes.func,

    /**
     * A function that emits a Promise<boolean> that confirms the clear-history operation.
     */
    onConfirmClear: PropTypes.func,
  }),

  /**
   * Bookbark Configuration Properties
   */
  bookmarks: PropTypes.shape({
    show: PropTypes.bool,
  }),
};
export default connect(
  () => ({}),
  dispatch => bindActionCreators({
    onStateSelect: jumpToState,
    onBranchSelect: jumpToBranch,
    onClear: clear,
    onLoad: load,
  }, dispatch)
)(History);
