import * as React from "react";
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import { IDagHistory } from 'redux-dag-history/lib/interfaces';
import Transport from '../../Transport';
import BookmarkListContainer, { IBookmarkListContainerProps } from './BookmarkListContainer';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { PropTypes } = React;

export interface IStoryboardingViewStateProps {}

export interface IStoryboardingViewDispatchProps {
  onPlayBookmarkStory: Function;
  onSkipToFirstBookmark: Function;
  onSkipToLastBookmark: Function;
  onNextBookmark: Function;
  onPreviousBookmark: Function;
}
export interface IStoryboardingViewOwnProps {
  history: IDagHistory<any>;
}

export interface IStoryboardingViewProps extends
  IStoryboardingViewStateProps,
  IStoryboardingViewDispatchProps,
  IStoryboardingViewOwnProps {
}

const StoryboardingView: React.StatelessComponent<IStoryboardingViewProps & IBookmarkListContainerProps> = (props) => {
  const {
    onPlayBookmarkStory,
    onSkipToFirstBookmark,
    onSkipToLastBookmark,
    onNextBookmark,
    onPreviousBookmark,
  } = props;
  return (
    <div className="history-container">
      {
        <BookmarkListContainer {...props} />
      }
      <Transport
        onSkipToStart={onSkipToFirstBookmark}
        onBack={onPreviousBookmark}
        onForward={onNextBookmark}
        onSkipToEnd={onSkipToLastBookmark}
        onPlay={onPlayBookmarkStory}
      />
    </div>
  );
};

StoryboardingView.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired,

  /* User Interaction Handlers - loaded by redux */
  onPlayBookmarkStory: PropTypes.func,
  onSkipToFirstBookmark: PropTypes.func,
  onSkipToLastBookmark: PropTypes.func,
  onNextBookmark: PropTypes.func,
  onPreviousBookmark: PropTypes.func,
};

export default connect<IStoryboardingViewStateProps, IStoryboardingViewDispatchProps, IStoryboardingViewOwnProps>(
  () => ({}),
  dispatch => bindActionCreators({
    onPlayBookmarkStory: DagHistoryActions.playBookmarkStory,
    onSkipToFirstBookmark: DagHistoryActions.skipToFirstBookmark,
    onSkipToLastBookmark: DagHistoryActions.skipToLastBookmark,
    onNextBookmark: DagHistoryActions.nextBookmark,
    onPreviousBookmark: DagHistoryActions.previousBookmark,
  }, dispatch)
)(StoryboardingView);
