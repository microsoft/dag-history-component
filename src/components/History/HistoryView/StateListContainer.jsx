import React, { PropTypes } from 'react';
import DagGraph from 'redux-dag-history/lib/DagGraph';
import StateList from '../../StateList';
import isNumber from '../../../isNumber';

const log = require('debug')('dag-history-component:components:HistoryView');

function getCurrentCommitPath(historyGraph) {
  const { currentBranch } = historyGraph;
  const latestCommitOnBranch = historyGraph.latestOn(currentBranch);
  return historyGraph.commitPath(latestCommitOnBranch);
}

function getStateList(
  historyGraph,
  commitPath,
  bookmarks,
  highlightSuccessorsOf,
  getSourceFromState
) {
  const {
    currentBranch,
    currentStateId,
  } = historyGraph;
  const activeBranchStartsAt = historyGraph.branchStartDepth(currentBranch);
  return commitPath.map((id, index) => {
    const state = historyGraph.getState(id);
    const source = getSourceFromState(state);
    const label = historyGraph.stateName(id);

    const branchType = index < activeBranchStartsAt ? 'legacy' : 'current';
    const bookmarked = bookmarks.map(b => b.stateId).includes(id);
    const isSuccessor = isNumber(highlightSuccessorsOf) &&
      historyGraph.parentOf(id) === highlightSuccessorsOf;
    const pinned = highlightSuccessorsOf === id;
    const active = currentStateId === id;

    return {
      id,
      source,
      label,
      active,
      pinned,
      isSuccessor,
      continuationActive: id === highlightSuccessorsOf,
      branchType,
      bookmarked,
      continuation: {
        count: historyGraph.childrenOf(id).length,
      },
    };
  }).reverse();
}


const StateListContainer = ({
  history: {
    graph,
    bookmarks,
  },
  commitPath,
  onHighlightSuccessors,
  onRemoveBookmark,
  onAddBookmark,
  onStateSelect,
  bookmarksEnabled,
  highlightSuccessorsOf,
  getSourceFromState,
  branchTypeOverride,
}) => {
  const historyGraph = new DagGraph(graph);
  const commitPathtoUse = commitPath || getCurrentCommitPath(historyGraph);
  const { currentStateId } = historyGraph;

  const onStateContinuationClick = id => onHighlightSuccessors(id);
  const onStateBookmarkClick = (id) => {
    log('bookmarking state %s',
      id,
      bookmarks,
      bookmarks.map(b => b.stateId),
      bookmarks.map(b => b.stateId).includes(id)
    );
    const bookmarked = bookmarks.map(b => b.stateId).includes(id);
    log('bookmarked?', bookmarked);
    return bookmarked ? onRemoveBookmark(id) : onAddBookmark(id);
  };
  const stateList = getStateList(
    historyGraph,
    commitPathtoUse,
    bookmarks,
    highlightSuccessorsOf,
    getSourceFromState
  );

  if (branchTypeOverride) {
    stateList.forEach(s => s.branchType = branchTypeOverride); // eslint-disable-line
  }

  return (
    <StateList
      activeStateId={currentStateId}
      states={stateList}
      onStateClick={onStateSelect}
      onStateContinuationClick={onStateContinuationClick}
      onStateBookmarkClick={onStateBookmarkClick}
      renderBookmarks={bookmarksEnabled}
    />
  );
};
StateListContainer.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired, // eslint-disable-line
  commitPath: PropTypes.arrayOf(PropTypes.number),
  getSourceFromState: PropTypes.func.isRequired,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,
  bookmarksEnabled: PropTypes.bool,
  branchTypeOverride: PropTypes.string,

  /**
   * User Interaction Handlers - loaded by redux
   */
  onStateSelect: PropTypes.func,
  onAddBookmark: PropTypes.func,
  onRemoveBookmark: PropTypes.func,
  onHighlightSuccessors: PropTypes.func,
};

export default StateListContainer;
