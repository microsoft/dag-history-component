import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import { IDagHistory } from 'redux-dag-history/lib/interfaces';
import * as DagComponentActions from '../../actions';
import HistoryTabs from './HistoryTabs';
import Transport from '../Transport';
import PlaybackPane from '../PlaybackPane';
import HistoryView from './HistoryView';
import StoryboardingView from './StoryboardingView';
import { IHistoryContainerSharedProps } from './interfaces';
import isNumber from '../../isNumber';
import './History.scss';

const { PropTypes } = React;

const log = require('debug')('dag-history-component:components:History');

const {
  selectMainView,
  toggleBranchContainer,
} = DagComponentActions;

export interface IHistoryStateProps {}
export interface IHistoryDispatchProps {
  onLoad: Function;
  onClear: Function;
  onSelectMainView: Function;
  onToggleBranchContainer: Function;
  onSkipToStart: Function;
  onSkipToEnd: Function;
  onPlayBookmarkStory: Function;
  onSkipToFirstBookmark: Function;
  onSkipToLastBookmark: Function;
  onNextBookmark: Function;
  onPreviousBookmark: Function;
}
export interface IHistoryOwnProps extends IHistoryContainerSharedProps {
}

export interface IHistoryProps extends IHistoryStateProps, IHistoryDispatchProps, IHistoryOwnProps {}

export class History extends React.Component<IHistoryProps, {}> {
  public static propTypes = {
    /**
     * The Dag-History Object
     */
    history: PropTypes.object.isRequired,
    mainView: PropTypes.string.isRequired,
    historyType: PropTypes.string.isRequired,
    getSourceFromState: PropTypes.func.isRequired,
    branchContainerExpanded: PropTypes.bool,
    highlightSuccessorsOf: PropTypes.number,

    /**
     * User Interaction Handlers - loaded by redux
     */
    onLoad: PropTypes.func,
    onClear: PropTypes.func,
    onSelectMainView: PropTypes.func,
    onToggleBranchContainer: PropTypes.func,
    onSkipToStart: PropTypes.func,
    onSkipToEnd: PropTypes.func,
    onPlayBookmarkStory: PropTypes.func,
    onSkipToFirstBookmark: PropTypes.func,
    onSkipToLastBookmark: PropTypes.func,
    onNextBookmark: PropTypes.func,
    onPreviousBookmark: PropTypes.func,

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

  async onLoadClicked() {
    log('history load clicked');
    const { onLoad, controlBar: { onLoadHistory } } = this.props;
    if (!onLoadHistory) {
      throw new Error("Cannot load history, 'onLoadHistory' must be defined");
    }
    const state = await onLoadHistory();
    if (!state) {
      throw new Error("'onLoadHistory' must return either a state graph object or a promise that resolves to a state graph object");
    }
    onLoad(state);
  }

  async onClearClicked() {
    const { onClear, controlBar: { onConfirmClear } } = this.props;
    log('clearing history');
    const doConfirm = onConfirmClear || (() => true);
    const confirmed = await doConfirm();
    return confirmed && onClear();
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
          playing
          onSkipToStart={onSkipToFirstBookmark}
          onBack={onPreviousBookmark}
          onForward={forwardAction}
          onSkipToEnd={onSkipToLastBookmark}
          onPlay={onPlayBookmarkStory}
          onStop={onPlayBookmarkStory}
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
    const isPlaybackMode = isNumber(bookmarkPlaybackIndex);

    return isPlaybackMode ? this.renderPlayback() : (
      <HistoryTabs
        bookmarksEnabled={bookmarksEnabled}
        selectedTab={mainView}
        onTabSelect={onSelectMainView}
        historyView={<HistoryView {...this.props} />}
        storyboardingView={<StoryboardingView {...this.props} />}
        onSaveClicked={this.onSaveClicked.bind(this)}
        onLoadClicked={this.onLoadClicked.bind(this)}
        onClearClicked={this.onClearClicked.bind(this)}
      />
    );
  }
}

export default connect<IHistoryStateProps, IHistoryDispatchProps, IHistoryOwnProps>(
  () => ({}), // we don't dictate state-shape
  dispatch => bindActionCreators({
    onClear: DagHistoryActions.clear,
    onLoad: DagHistoryActions.load,
    onSelectMainView: selectMainView,
    onToggleBranchContainer: toggleBranchContainer,
    onSkipToStart: DagHistoryActions.skipToStart,
    onSkipToEnd: DagHistoryActions.skipToEnd,
    onPlayBookmarkStory: DagHistoryActions.playBookmarkStory,
    onSkipToFirstBookmark: DagHistoryActions.skipToFirstBookmark,
    onSkipToLastBookmark: DagHistoryActions.skipToLastBookmark,
    onNextBookmark: DagHistoryActions.nextBookmark,
    onPreviousBookmark: DagHistoryActions.previousBookmark,
  }, dispatch)
)(History);


