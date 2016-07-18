import React, { PropTypes } from 'react';
import Bookmark from '../Bookmark';
require('./BookmarkList.sass');

const BookmarkList = ({
  bookmarks,
  onBookmarkClick,
  onBookmarkContinuationClick,
}) => {
  const bookmark = bookmarks.map(s => (
    <Bookmark
      key={`bookmark::${s.stateId}`}
      {...s}
      onClick={() => onBookmarkClick(s.stateId)}
      onContinuationClick={() => onBookmarkContinuationClick(s.stateId)}
    />
  ));
  return (
    <div className="history-bookmark-list">
      {bookmark}
    </div>
  );
};

BookmarkList.propTypes = {
  onBookmarkClick: PropTypes.func,
  onBookmarkContinuationClick: PropTypes.func,
  bookmarks: PropTypes.arrayOf(React.PropTypes.shape({
    stateId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    continuation: PropTypes.shape({
      numContinuations: PropTypes.number,
      isSelected: PropTypes.bool,
    }).isRequired,
  })).isRequired,
};

export default BookmarkList;
