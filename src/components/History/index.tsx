import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DagHistoryActions from '@essex/redux-dag-history/lib/ActionCreators';
import * as Actions from '../../actions';
import { IDagHistory } from '@essex/redux-dag-history/lib/interfaces';
import DagGraph from '@essex/redux-dag-history/lib/DagGraph';
import * as DagComponentActions from '../../actions';
import HistoryTabs from './HistoryTabs';
import Transport from '../Transport';
import PlaybackPane from '../PlaybackPane';
import HistoryView from './HistoryView';
import StoryboardingView from './StoryboardingView';
import { IHistoryContainerSharedProps } from './interfaces';
import isNumber from '../../isNumber';
import makeActions from './BookmarkActions';
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
  onStartPlayback: Function;
  onStopPlayback: Function;
  onSelectBookmarkDepth: Function;
}
export interface IHistoryOwnProps extends IHistoryContainerSharedProps {
  history: any;
  mainView: string;
  historyType: string;
  getSourceFromState: Function;
  branchContainerExpanded?: boolean;
  highlightSuccessorsOf?: number;
  selectedBookmark?: number;
  selectedBookmarkDepth?: number;
  isPlayingBack?: boolean;
  bindTransportKeysGlobally?: boolean;
  onSelectState?: Function;
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
    selectedBookmark: PropTypes.number,
    selectedBookmarkDepth: PropTypes.number,

    /**
     * User Interaction Handlers - loaded by redux
     */
    onLoad: PropTypes.func,
    onClear: PropTypes.func,
    onSelectMainView: PropTypes.func,
    onToggleBranchContainer: PropTypes.func,
    onStartPlayback: PropTypes.func,
    onStopPlayback: PropTypes.func,
    onSelectState: PropTypes.func,

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

    bindTransportKeysGlobally: PropTypes.bool,
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
      history,
      onStartPlayback,
      onStopPlayback,
      selectedBookmark,
      selectedBookmarkDepth,
      onSelectBookmarkDepth,
      onSelectState,
      bindTransportKeysGlobally,
    } = this.props;

    const {
      bookmarks,
      graph,
    } = history;
    const historyGraph = new DagGraph(graph);
    const bookmark = bookmarks[selectedBookmark];
    const slideText = bookmark.data.annotation || bookmark.name || 'No Slide Data';
    const numLeadInStates = bookmark.data.numLeadInStates;
    const bookmarkPath = historyGraph.shortestCommitPath(bookmark.stateId);

    const {
      handleStepBack,
      handleStepForward,
      handleNextBookmark,
      handlePreviousBookmark,
      handleSkipToEnd,
      handleSkipToStart,
    } = makeActions(selectedBookmark, selectedBookmarkDepth, history, onSelectBookmarkDepth, true);

    const bookmarkHighlight = (selectedBookmarkDepth !== undefined) ?
      selectedBookmarkDepth :
      bookmarkPath.length - 1;

    // End the presentation if we're on the last slide
    return (
      <div className="state-list-container">
        <PlaybackPane
          text={slideText}
          depth={bookmarks.length}
          highlight={selectedBookmark}
          bookmarkDepth={bookmarkPath.length}
          bookmarkHighlight={bookmarkHighlight}
          bookmarkNumLeadInStates={numLeadInStates}
          onDiscoveryTrailIndexClicked={selectedIndex => {
            const target = bookmarkPath[selectedIndex];
            onSelectBookmarkDepth({ target, depth: selectedIndex, state: target });
            onSelectState(target);
          }}
        />
        <Transport
          playing
          bindTransportKeysGlobally={bindTransportKeysGlobally}
          onSkipToStart={handleSkipToEnd}
          onStepBack={handleStepBack}
          onStepForward={handleStepForward}
          onBack={handlePreviousBookmark}
          onForward={handleNextBookmark}
          onSkipToEnd={handleSkipToStart}
          onPlay={onStartPlayback}
          onStop={onStopPlayback}
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
      isPlayingBack,
    } = this.props;
    return isPlayingBack ? this.renderPlayback() : (
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
    onSelectState: DagHistoryActions.jumpToState,
    onToggleBranchContainer: toggleBranchContainer,
    onStartPlayback: Actions.startPlayback,
    onStopPlayback: Actions.stopPlayback,
    onSelectBookmarkDepth: Actions.selectBookmarkDepth,
  }, dispatch)
)(History);


