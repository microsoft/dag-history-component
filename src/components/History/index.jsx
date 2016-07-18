const log = require('debug')('dag-history-component:components:History');
import DagGraph from 'redux-dag-history/lib/DagGraph';
import React, { PropTypes } from 'react';
import StateList from '../StateList';
import BranchList from '../BranchList';
import BookmarkList from '../BookmarkList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import OptionDropdown from '../OptionDropdown';
require('./History.sass');

const {
    jumpToState,
    jumpToBranch,
    load,
    clear,
    addBookmark,
    removeBookmark,
    renameBookmark,
} = DagHistoryActions;

const viewNames = {
  branches: 'Branches',
  bookmarks: 'Bookmarks',
  history: 'History',
};

export class History extends React.Component {
  constructor() {
    super();
    this.state = {
      mainView: 'history',
      underView: 'branches',
    };
  }

  onSaveClicked() {
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
    const { onLoad, controlBar: { onLoadHistory } } = this.props;
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
    return commitPath.map((id, index) => {
      const label = historyGraph.stateName(id);
      const branchType = index < activeBranchStartsAt ? 'legacy' : 'current';
      const bookmarked = bookmarks.map(b => b.stateId).includes(id);
      return {
        id,
        label,
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

  renderStateList(historyGraph, commitPath, bookmarks) {
    const {
      onStateSelect,
      onAddBookmark,
      onRemoveBookmark,
      bookmarks: { show: showBookmarks },
    } = this.props;
    const { currentStateId } = historyGraph;
    const onStateContinuationClick = (id) => log('state continuation clicked!', id);
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

    return (
      <StateList
        activeStateId={currentStateId}
        states={this.getStateList(historyGraph, commitPath, bookmarks)}
        onStateClick={onStateSelect}
        onStateContinuationClick={onStateContinuationClick}
        onStateBookmarkClick={onStateBookmarkClick}
        renderBookmarks={showBookmarks}
      />
    );
  }

  renderBranchList(historyGraph, commitPath) {
    const { currentBranch } = historyGraph;
    const { onBranchSelect } = this.props;
    const onBranchContinuationClick = (id) => log('branch continuation clicked', id);
    return (
      <BranchList
        activeBranch={currentBranch}
        branches={this.getBranchList(historyGraph, commitPath)}
        onBranchClick={onBranchSelect}
        onBranchContinuationClick={onBranchContinuationClick}
      />
    );
  }

  renderBookmarks(historyGraph, commitPath, bookmarks) {
    const { currentStateId } = historyGraph;
    const { onStateSelect } = this.props;

    const bookmarkData = bookmarks.map(b => {
      const isSelected = b.stateId === currentStateId;
      return {
        ...b,
        active: isSelected,
        continuation: {
          isSelected,
          numContinuations: 0,
        },
      };
    });
    log('rendering bookmarks with data', bookmarkData);
    return (
      <BookmarkList
        bookmarks={bookmarkData}
        onBookmarkClick={(id) => onStateSelect(id)}
        onBookmarkContinuationClick={(id) => log(`bookmark ${id} continuation click`)}
      />
    );
  }

  renderMainView(historyGraph, commitPath, bookmarks) {
    const { mainView } = this.state;
    switch (mainView) {
      default:
        return this.renderStateList(historyGraph, commitPath, bookmarks);
    }
  }

  renderUnderView(historyGraph, commitPath, bookmarks) {
    const { underView } = this.state;
    switch (underView) {
      case 'branches':
        return this.renderBranchList(historyGraph, commitPath, bookmarks);
      case 'bookmarks':
        return this.renderBookmarks(historyGraph, commitPath, bookmarks);
      default:
        return this.renderBranchList(historyGraph, commitPath, bookmarks);
    }
  }

  render() {
    const { history: { graph, bookmarks }, controlBar: { show: showControlBar } } = this.props;
    const { underView, mainView } = this.state;
    const historyGraph = new DagGraph(graph);
    const commitPath = this.getCurrentCommitPath(historyGraph);

    return (
      <div className="history-container">
        <div className="history-control-bar">
          <OptionDropdown
            label={viewNames[mainView]}
            triggerClass="view-select-dropdown"
            options={[]}
          />
          {
            <OptionDropdown
              contentClass="view-options-dropdown"
              options={showControlBar ? [
                { label: 'Save', onClick: this.onSaveClicked.bind(this) }, // eslint-disable-line
                { label: 'Load', onClick: this.onLoadClicked.bind(this) }, // eslint-disable-line
                { label: 'Clear', onClick: this.onClearClicked.bind(this) }, // eslint-disable-line
              ] : []}
            />
          }
        </div>
        <div className="state-list-container">
          {this.renderMainView(historyGraph, commitPath, bookmarks)}
        </div>
        <div className="branch-list-container">
          <div className="history-control-bar">
            <OptionDropdown
              label={viewNames[underView]}
              triggerClass="view-select-dropdown"
              options={[
               { label: 'Branches', onClick: () => this.onUnderViewClicked('branches') },
               { label: 'Bookmarks', onClick: () => this.onUnderViewClicked('bookmarks') },
              ]}
            />
            <OptionDropdown options={[]} />
          </div>
          {this.renderUnderView(historyGraph, commitPath, bookmarks)}
        </div>
      </div>
    );
  }
}

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
  onAddBookmark: PropTypes.func,
  onRemoveBookmark: PropTypes.func,
  onRenameBookmark: PropTypes.func,

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
    onAddBookmark: addBookmark,
    onRemoveBookmark: removeBookmark,
    onRenameBookmark: renameBookmark,
  }, dispatch)
)(History);
