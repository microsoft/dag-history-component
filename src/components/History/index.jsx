import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import * as DagComponentActions from '../../actions';
import HistoryTabs from './HistoryTabs';
import Transport from '../Transport';
import PlaybackPane from '../PlaybackPane';
import HistoryView from './HistoryView';
import StoryboardingView from './StoryboardingView';
import './History.scss';

const log = require('debug')('dag-history-component:components:History');

const {
    jumpToState,
    jumpToLatestOnBranch,
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
    playBookmarkStory,
    skipToFirstBookmark,
    skipToLastBookmark,
    nextBookmark,
    previousBookmark,
    renameBranch,
} = DagHistoryActions;

const {
  selectMainView,
  toggleBranchContainer,
  editBookmark,
} = DagComponentActions;

export class History extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
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
    log('history load clicked');
    const { onLoad, controlBar: { onLoadHistory } } = this.props;
    if (!onLoadHistory) {
      throw new Error("Cannot load history, 'onLoadHistory' must be defined");
    }
    return Promise.resolve(onLoadHistory()).then((state) => {
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

  renderPlayback() {
    const {
      history: {
        bookmarks,
        bookmarkPlaybackIndex,
      },
      onPlayBookmarkStory,
      onSkipToFirstBookmark,
      onSkipToLastBookmark,
      onNextBookmark,
      onPreviousBookmark,
    } = this.props;

    const bookmark = bookmarks[bookmarkPlaybackIndex];
    const slideText = bookmark.data.annotation || bookmark.name || 'No Slide Data';
    const isLastSlide = bookmarkPlaybackIndex === bookmarks.length - 1;
    // End the presentation if we're on the last slide
    const forwardAction = isLastSlide ? onPlayBookmarkStory : onNextBookmark;
    return (
      <div className="state-list-container">
        <PlaybackPane text={slideText} />
        <Transport
          showPause
          iconSize={30}
          onSkipToStart={onSkipToFirstBookmark}
          onBack={onPreviousBookmark}
          onForward={forwardAction}
          onSkipToEnd={onSkipToLastBookmark}
          onPlay={onPlayBookmarkStory}
        />
      </div>
    );
  }

  render() {
    const {
      history: {
        bookmarkPlaybackIndex,
      },
      mainView,
      onSelectMainView,
      bookmarksEnabled,
    } = this.props;
    const isPlaybackMode = Number.isInteger(bookmarkPlaybackIndex);

    return isPlaybackMode ? this.renderPlayback() : (
      <HistoryTabs
        bookmarksEnabled={bookmarksEnabled}
        selectedTab={mainView}
        onTabSelect={onSelectMainView}
        historyView={<HistoryView {...this.props} />}
        storyboardingView={<StoryboardingView {...this.props} />}
        onSaveClicked={this.onSaveClicked.bind(this)}  // eslint-disable-line
        onLoadClicked={this.onLoadClicked.bind(this)}  // eslint-disable-line
        onClearClicked={this.onClearClicked.bind(this)}  // eslint-disable-line
      />
    );
  }
}

History.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired, // eslint-disable-line
  mainView: PropTypes.string.isRequired,
  historyType: PropTypes.string.isRequired,
  getSourceFromState: PropTypes.func.isRequired,
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
  onPlayBookmarkStory: PropTypes.func,
  onSkipToFirstBookmark: PropTypes.func,
  onSkipToLastBookmark: PropTypes.func,
  onNextBookmark: PropTypes.func,
  onPreviousBookmark: PropTypes.func,
  onRenameBranch: PropTypes.func,
  onEditBookmark: PropTypes.func,

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
  () => ({}), // we don't dictate state-shape
  dispatch => bindActionCreators({
    onStateSelect: jumpToState,
    onBranchSelect: jumpToLatestOnBranch,
    onClear: clear,
    onLoad: load,
    onRenameBranch: renameBranch,
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
    onPlayBookmarkStory: playBookmarkStory,
    onSkipToFirstBookmark: skipToFirstBookmark,
    onSkipToLastBookmark: skipToLastBookmark,
    onNextBookmark: nextBookmark,
    onPreviousBookmark: previousBookmark,
    onEditBookmark: editBookmark,
  }, dispatch)
)(History);
