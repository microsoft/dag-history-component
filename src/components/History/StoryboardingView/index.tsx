import * as React from "react";
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import { IDagHistory } from 'redux-dag-history/lib/interfaces';
import { connect } from 'react-redux';
import DagGraph from 'redux-dag-history/lib/DagGraph';
import { bindActionCreators } from "redux";
import Transport from '../../Transport';
import * as Actions from '../../../actions';
import BookmarkListContainer, { IBookmarkListContainerProps } from './BookmarkListContainer';
import { makeActions } from '../BookmarkActions';
const { PropTypes } = React;

export interface IStoryboardingViewStateProps {}

export interface IStoryboardingViewDispatchProps {
  onStartPlayback: Function;
  onStopPlayback: Function;
  onSelectBookmarkDepth: Function;
}
export interface IStoryboardingViewOwnProps {
  history: IDagHistory<any>;
  selectedBookmark?: number;
  selectedBookmarkDepth?: number;
}

export interface IStoryboardingViewProps extends
  IStoryboardingViewStateProps,
  IStoryboardingViewDispatchProps,
  IStoryboardingViewOwnProps {
}

const StoryboardingView: React.StatelessComponent<IStoryboardingViewProps & IBookmarkListContainerProps> = (props) => {
  const {
    history,
    onStartPlayback,
    onStopPlayback,
    selectedBookmark,
    selectedBookmarkDepth,
    onSelectBookmarkDepth,
  } = props;

  const {
    handleStepBack,
    handleStepForward,
    handleNextBookmark,
    handlePreviousBookmark,
    handleSkipToEnd,
    handleSkipToStart,
  } = makeActions(selectedBookmark, selectedBookmarkDepth, history, onSelectBookmarkDepth);

  return (
    <div className="history-container">
      <BookmarkListContainer {...props} />
      <Transport
        onSkipToStart={handleSkipToStart}
        onBack={handlePreviousBookmark}
        onForward={handleNextBookmark}
        onSkipToEnd={handleSkipToEnd}
        onPlay={onStartPlayback}
        onStop={onStopPlayback}
        onStepBack={handleStepBack}
        onStepForward={handleStepForward}
      />
    </div>
  );
};

StoryboardingView.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired,
  selectedBookmark: PropTypes.number,
  selectedBookmarkDepth: PropTypes.number,

  /* User Interaction Handlers - loaded by redux */
  onPlayBookmarkStory: PropTypes.func,
  onSkipToFirstBookmark: PropTypes.func,
  onSkipToLastBookmark: PropTypes.func,
  onNextBookmark: PropTypes.func,
  onPreviousBookmark: PropTypes.func,
  onSelectBookmarkDepth: PropTypes.func,
};

export default connect<IStoryboardingViewStateProps, IStoryboardingViewDispatchProps, IStoryboardingViewOwnProps>(
  () => ({}),
  dispatch => bindActionCreators({
    onStartPlayback: Actions.startPlayback,
    onStopPlayback: Actions.stopPlayback,
    onSelectBookmarkDepth: Actions.selectBookmarkDepth,
  }, dispatch)
)(StoryboardingView);
