const log = require('debug')('dag-history-component:components:History');
import DagGraph from 'redux-dag-history/lib/DagGraph';
import React, { PropTypes } from 'react';
import StateList from '../StateList';
import BranchList from '../BranchList';
import BookmarkList from '../BookmarkList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import * as DagComponentActions from '../../actions';
import OptionDropdown from '../OptionDropdown';
import HistoryContainer from './HistoryContainer';
import ExpandCollapseToggle from '../ExpandCollapseToggle';
import Transport from '../Transport';

import './History.scss';

const isNumber = d => !isNaN(d) && d !== null;

const {
    jumpToState,
    jumpToBranch,
    load,
    clear,
    addBookmark,
    removeBookmark,
    changeBookmark,
    moveBookmark,
    undo,
    redo,
    skipToStart,
    skipToEnd,
    pinState: highlightSuccessors,
} = DagHistoryActions;

const {
  selectMainView,
  toggleBranchContainer,
} = DagComponentActions;

export class History extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  onSaveClicked() {
    log('history save clicked');
    const { history, controlBar: { onSaveHistory } } = this.props;
    const { current, lastBranchId, lastStateId, graph, bookmarks } = history;
    // Pass the plain history up to the client to save
    onSaveHistory({
      current,
      lastBranchId,
      lastStateId,
      bookmarks,
      graph: graph.toJS(),
    });
  }

  onLoadClicked() {
    log('history load clicked');
    const { onLoad, controlBar: { onLoadHistory } } = this.props;
    if (!onLoadHistory) {
      throw new Error("Cannot load history, 'onLoadHistory' must be defined");
    }
    Promise.resolve(onLoadHistory()).then(state => {
      if (!state) {
        throw new Error("'onLoadHistory' must return either a state graph object or a promise that resolves to a state graph object"); // eslint-disable-line
      }
      onLoad(state);
    });
  }

  onClearClicked() {
    const { onClear, controlBar: { onConfirmClear } } = this.props;
    log('clearing history');
    const doConfirm = onConfirmClear || (() => true);
    return Promise.resolve(doConfirm()).then(confirmed => confirmed && onClear());
  }

  onUnderViewClicked(underView) {
    log('underview clicked', underView);
    this.setState({ ...this.state, underView });
  }

  getCurrentCommitPath(historyGraph) {
    const { currentBranch } = historyGraph;
    const latestCommitOnBranch = historyGraph.latestOn(currentBranch);
    return historyGraph.commitPath(latestCommitOnBranch);
  }

  getStateList(historyGraph, commitPath, bookmarks) {
    const { currentBranch, currentStateId } = historyGraph;
    const activeBranchStartsAt = historyGraph.branchStartDepth(currentBranch);
    const {
      highlightSuccessorsOf,
    } = this.props;
    return commitPath.map((id, index) => {
      const label = historyGraph.stateName(id);
      const branchType = index < activeBranchStartsAt ? 'legacy' : 'current';
      const bookmarked = bookmarks.map(b => b.stateId).includes(id);
      const isSuccessor = isNumber(highlightSuccessorsOf) &&
        historyGraph.parentOf(id) === highlightSuccessorsOf;
      return {
        id,
        label,
        active: currentStateId === id,
        isPinned: highlightSuccessorsOf === id,
        isSuccessor,
        continuationActive: id === highlightSuccessorsOf,
        branchType,
        bookmarked,
        continuation: {
          numContinuations: historyGraph.childrenOf(id).length,
          isSelected: currentStateId === id,
        },
      };
    }).reverse();
  }

  getBranchList(historyGraph, commitPath) {
    const {
      branches,
      maxDepth,
      currentBranch,
      currentStateId,
    } = historyGraph;
    const {
      highlightSuccessorsOf: pinnedState,
    } = this.props;
    const pinnedStateBranch = historyGraph.branchOf(pinnedState);

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

    // This is a hash of branchId -> stateId
    const selectedSuccessorsByBranch = {};
    if (isNumber(pinnedState)) {
      historyGraph.childrenOf(pinnedState).forEach(child => {
        const branch = historyGraph.branchOf(child);
        selectedSuccessorsByBranch[branch] = child;
      });
    }

    const getSuccessorDepth = branch => {
      const successorId = selectedSuccessorsByBranch[branch];
      return successorId ?
        historyGraph.depthIndexOf(branch, successorId) :
        null;
    };

    const getPinnedStateDepth = (branch) => {
      if (!isNumber(pinnedState) || pinnedStateBranch !== branch) {
        return null;
      }
      return historyGraph.depthIndexOf(branch, pinnedState);
    };

    const activeStateBranch = historyGraph.branchOf(currentStateId);
    const activeStateIndex = historyGraph.depthIndexOf(activeStateBranch, currentStateId);

    return branches.sort((a, b) => a - b).reverse().map(branch => {
      const startsAt = historyGraph.branchStartDepth(branch);
      const endsAt = historyGraph.branchEndDepth(branch);
      const branchType = currentBranch === branch ? 'current' : 'legacy';
      const label = historyGraph.getBranchName(branch);
      const showActiveStateIndex = currentBranch === branch || activeStateBranch === branch;

      // Figure out where this branch intersects the commit path
      const myBranchPath = branchPaths[branch];
      const currentBranchStart = myBranchPath ? myBranchPath.start : null;
      const currentBranchEnd = myBranchPath ? myBranchPath.end : null;
      const successorDepth = !isNumber(pinnedState) ?
        null :
        getSuccessorDepth(branch);
      const pinnedStateIndex = getPinnedStateDepth(branch);
      return {
        id: branch,
        active: currentBranch === branch,
        label,
        activeStateIndex: showActiveStateIndex ? activeStateIndex : null,
        startsAt,
        endsAt,
        maxDepth,
        branchType,
        currentBranchStart,
        currentBranchEnd,
        successorDepth,
        pinnedStateIndex,
      };
    })
    .filter(branch => (
      !pinnedState ||
      branch.active ||
      isNumber(branch.pinnedStateIndex) ||
      isNumber(branch.successorDepth)
    ));
  }

  renderStateList(historyGraph, commitPath) {
    const {
      onStateSelect,
      onAddBookmark,
      onRemoveBookmark,
      onHighlightSuccessors,
      history: { bookmarks },
      bookmarksEnabled,
    } = this.props;
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
    const stateList = this.getStateList(historyGraph, commitPath, bookmarks);
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
  }

  renderBranchList(historyGraph, commitPath) {
    const { currentBranch } = historyGraph;
    const { onBranchSelect } = this.props;
    const onBranchContinuationClick = (id) => log('branch continuation clicked', id);
    const branchList = this.getBranchList(historyGraph, commitPath);
    return (
      <BranchList
        activeBranch={currentBranch}
        branches={branchList}
        onBranchClick={onBranchSelect}
        onBranchContinuationClick={onBranchContinuationClick}
      />
    );
  }

  renderBookmarks(historyGraph) {
    const { currentStateId } = historyGraph;
    const {
      history: { bookmarks },
      onStateSelect,
      onBookmarkChange,
      onBookmarkMove,
    } = this.props;
    const bookmarkData = bookmarks.map(b => {
      const isSelected = b.stateId === currentStateId;
      return {
        ...b,
        itemKey: `bookmark::${b.stateId}`,
        active: isSelected,
        annotation: b.data.annotation || null,
        continuation: {
          isSelected,
          numContinuations: 0,
        },
        onBookmarkChange: ({ name, data }) => onBookmarkChange({ bookmark: b.stateId, name, data }),
      };
    });
    return (
      <BookmarkList
        bookmarks={bookmarkData}
        onBookmarkClick={(id) => onStateSelect(id)}
        onBookmarkContinuationClick={(id) => log(`bookmark ${id} continuation click`)}
        onBookmarkMove={onBookmarkMove}
      />
    );
  }

  renderHistoryView(historyGraph, commitPath) {
    const {
      branchContainerExpanded,
      onToggleBranchContainer,
      onUndo,
      onRedo,
      onSkipToStart,
      onSkipToEnd,
    } = this.props;
    const branchList = branchContainerExpanded ?
      this.renderBranchList(historyGraph, commitPath) :
      <div />;
    return (
      <div className="history-container">
        <div className="state-list-container">
          <div className="history-control-bar">
            <div className="title">States</div>
            {
              <OptionDropdown
                contentClass="view-options-dropdown"
                options={[
                  { label: 'Save', onClick: this.onSaveClicked.bind(this) }, // eslint-disable-line
                  { label: 'Load', onClick: this.onLoadClicked.bind(this) }, // eslint-disable-line
                  { label: 'Clear', onClick: this.onClearClicked.bind(this) }, // eslint-disable-line
                ]}
              />
            }
          </div>
          {this.renderStateList(historyGraph, commitPath)}
        </div>
        <div className="branch-list-container">
          <div className="history-control-bar">
            <div className="title">Branches</div>
            <ExpandCollapseToggle
              isExpanded={branchContainerExpanded}
              onClick={onToggleBranchContainer}
            />
          </div>
          {branchList}
        </div>
        <Transport
          iconSize={30}
          onSkipToStart={onSkipToStart}
          onBack={onUndo}
          onForward={onRedo}
          onSkipToEnd={onSkipToEnd}
        />
      </div>
    );
  }

  renderStoryboardingView(historyGraph, commitPath) {
    return (
      <div className="history-container">
        <div className="history-control-bar">
          <div className="title">Bookmarked States</div>
          {
            <OptionDropdown
              contentClass="view-options-dropdown"
              options={[
                { label: 'Save', onClick: this.onSaveClicked.bind(this) }, // eslint-disable-line
                { label: 'Load', onClick: this.onLoadClicked.bind(this) }, // eslint-disable-line
                { label: 'Clear', onClick: this.onClearClicked.bind(this) }, // eslint-disable-line
              ]}
            />
          }
        </div>
        <div className="state-list-container">
          {this.renderBookmarks(historyGraph, commitPath)}
        </div>
      </div>
    );
  }

  render() {
    const {
      history: { graph },
      mainView,
      onSelectMainView,
      bookmarksEnabled,
    } = this.props;
    const historyGraph = new DagGraph(graph);
    const commitPath = this.getCurrentCommitPath(historyGraph);
    return (
      <HistoryContainer
        bookmarksEnabled={bookmarksEnabled}
        selectedTab={mainView}
        onTabSelect={onSelectMainView}
        historyView={this.renderHistoryView(historyGraph, commitPath)}
        storyboardingView={this.renderStoryboardingView(historyGraph, commitPath)}
      />
    );
  }
}

History.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired,
  mainView: PropTypes.string.isRequired,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,

  /**
   * User Interaction Handlers - loaded by redux
   */
  onBranchSelect: PropTypes.func,
  onStateSelect: PropTypes.func,
  onLoad: PropTypes.func,
  onClear: PropTypes.func,
  onAddBookmark: PropTypes.func,
  onRemoveBookmark: PropTypes.func,
  onBookmarkChange: PropTypes.func,
  onSelectMainView: PropTypes.func,
  onToggleBranchContainer: PropTypes.func,
  onBookmarkMove: PropTypes.func,
  onHighlightSuccessors: PropTypes.func,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
  onSkipToStart: PropTypes.func,
  onSkipToEnd: PropTypes.func,

  /**
   * ControlBar Configuration Properties
   */
  controlBar: PropTypes.shape({
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
  bookmarksEnabled: PropTypes.bool,
};
export default connect(
  () => ({}),
  dispatch => bindActionCreators({
    onStateSelect: jumpToState,
    onBranchSelect: jumpToBranch,
    onClear: clear,
    onLoad: load,
    onAddBookmark: addBookmark,
    onRemoveBookmark: removeBookmark,
    onBookmarkChange: changeBookmark,
    onSelectMainView: selectMainView,
    onToggleBranchContainer: toggleBranchContainer,
    onBookmarkMove: moveBookmark,
    onUndo: undo,
    onRedo: redo,
    onSkipToStart: skipToStart,
    onSkipToEnd: skipToEnd,
    onHighlightSuccessors: highlightSuccessors,
  }, dispatch)
)(History);
