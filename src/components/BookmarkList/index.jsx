const log = require('debug')('redux-dag-history:BookmarkList');
import React, { PropTypes } from 'react';
import Bookmark from '../Bookmark';
import './BookmarkList.scss';

const placeholder = document.createElement('div');
placeholder.className = 'placeholder';

class BookmarkList extends React.Component {
  constructor() {
    super();
    this.over = null;
    this.dragged = null;
    this.dragParent = null;
    this.draggedStyleDisplay = null;
  }

  onBookmarkDragStart(event) {
    log('Drag Start', event.currentTarget);

    // Set some local state
    this.dragged = event.currentTarget;
    this.dragParent = this.dragged.parentNode;
    this.draggedDisplayStyle = this.dragged.style.display;

    event.dataTransfer.effectAllowed = 'move'; // eslint-disable-line
    event.dataTransfer.setData('text/html', event.currentTarget);
  }

  onBookmarkDragEnd(event) {
    log('Drag End', event, this);
    const { onBookmarkMove } = this.props;
    this.dragged.style.display = this.draggedDisplayStyle;

    if (placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }

    // Update state
    const from = Number(this.dragged.dataset.index);
    const to = Number(this.over.dataset.index);
    log('From %s => %s', from, to);
    if (!isNaN(to)) {
      onBookmarkMove({ from, to });
    }
  }

  onDragOver(event) {
    // log('Drag Over', event);
    event.preventDefault();
    this.dragged.style.display = 'none';
    if (event.target.className == 'placeholder') return; // eslint-disable-line
    this.over = event.target;
    event.target.parentNode.insertBefore(placeholder, event.target);
  }

  render() {
    const {
      bookmarks,
      onBookmarkClick,
      onBookmarkContinuationClick,
    } = this.props;
    const bookmarkViews = bookmarks.map((s, index) => (
      <Bookmark
        key={`bookmark::${s.stateId}`}
        index={index}
        {...s}
        draggable
        onDragStart={event => this.onBookmarkDragStart(event)}
        onDragEnd={event => this.onBookmarkDragEnd(event)}
        onClick={() => onBookmarkClick(s.stateId)}
        onContinuationClick={() => onBookmarkContinuationClick(s.stateId)}
      />
    ));
    // The endSentinel is here for drag-and-drop operations so that we have an elements
    // at the end of the bookmark list.
    const endSentinel = (
      <div
        key="bookmarks::endsentinel"
        className="history-bookmark-end-sentinel"
        data-index={bookmarkViews.length}
      />
    );
    return (
      <div className="state-list-container" onDragOver={(event) => this.onDragOver(event)}>
        {bookmarkViews.concat([endSentinel])}
      </div>
    );
  }
}

BookmarkList.propTypes = {
  onBookmarkClick: PropTypes.func,
  onBookmarkContinuationClick: PropTypes.func,
  onBookmarkMove: PropTypes.func.isRequired,
  bookmarks: PropTypes.arrayOf(React.PropTypes.shape(Bookmark.PropTypes)).isRequired,
};

export default BookmarkList;
