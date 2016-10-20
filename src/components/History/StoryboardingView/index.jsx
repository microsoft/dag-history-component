import React, { PropTypes } from 'react';
import Transport from '../../Transport';
import BookmarkListContainer from './BookmarkListContainer';

const StoryboardingView = (props) => {
  const {
    onPlayBookmarkStory,
    onSkipToFirstBookmark,
    onSkipToLastBookmark,
    onNextBookmark,
    onPreviousBookmark,
  } = props;
  return (
    <div className="history-container">
      {<BookmarkListContainer {...props} />}
      <Transport
        showPlay
        iconSize={30}
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
  history: PropTypes.object.isRequired, // eslint-disable-line

  /**
   * User Interaction Handlers - loaded by redux
   */
  onPlayBookmarkStory: PropTypes.func,
  onSkipToFirstBookmark: PropTypes.func,
  onSkipToLastBookmark: PropTypes.func,
  onNextBookmark: PropTypes.func,
  onPreviousBookmark: PropTypes.func,
};
export default StoryboardingView;
