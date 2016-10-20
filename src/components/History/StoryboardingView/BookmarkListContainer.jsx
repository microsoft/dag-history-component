import React, { PropTypes } from 'react';
import DagGraph from 'redux-dag-history/lib/DagGraph';
import BookmarkList from '../../BookmarkList';

const log = require('debug')('dag-history-component:components:StoryboardingView');

const BookmarkListContainer = (props) => {
  const {
    history: { bookmarks, graph },
    onStateSelect,
    onBookmarkChange,
    onBookmarkMove,
    onEditBookmark,
  } = props;
  const historyGraph = new DagGraph(graph);
  const { currentStateId } = historyGraph;
  const bookmarkData = bookmarks.map((b) => {
    const isSelected = b.stateId === currentStateId;
    return {
      ...b,
      active: isSelected,
      annotation: b.data.annotation || '',
      onEdit: () => onEditBookmark(b.stateId),
      onBookmarkChange: ({ name, data }) => onBookmarkChange({ bookmark: b.stateId, name, data }),
    };
  });
  return (
    <BookmarkList
      onEdit={onEditBookmark}
      bookmarks={bookmarkData}
      onBookmarkClick={id => onStateSelect(id)}
      onBookmarkContinuationClick={id => log(`bookmark ${id} continuation click`)}
      onBookmarkMove={onBookmarkMove}
    />
  );
};

BookmarkListContainer.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired, // eslint-disable-line

  /**
   * User Interaction Handlers - loaded by redux
   */
  onStateSelect: PropTypes.func,
  onBookmarkChange: PropTypes.func,
  onBookmarkMove: PropTypes.func,
  onEditBookmark: PropTypes.func,
};
export default BookmarkListContainer;
