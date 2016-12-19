import * as React from "react";
import Bookmark from '../Bookmark';
import './BookmarkList.scss';

const { PropTypes } = React;

const log = require('debug')('@essex/redux-dag-history:BookmarkList');

const placeholder = document.createElement('div');
placeholder.className = 'placeholder';

export interface IBookmarkListProps {
  bookmarks: any[];
  onBookmarkClick?: Function;
  onBookmarkMove?: Function;
}

class BookmarkList extends React.Component<IBookmarkListProps, {}> {

  public static propTypes = {
    onBookmarkClick: PropTypes.func,
    onBookmarkMove: PropTypes.func,
    bookmarks: PropTypes.arrayOf(
      React.PropTypes.shape(Bookmark.propTypes)
    ).isRequired,
  };

  private over: any;
  private dragged: any;
  private dragParent: any;
  private draggedStyleDisplay: any;

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
    this.draggedStyleDisplay = this.dragged.style.display;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.currentTarget);
  }

  onBookmarkDragEnd(event) {
    log('Drag End', event, this);
    const { onBookmarkMove } = this.props;
    this.dragged.style.display = this.draggedStyleDisplay;

    if (placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }

    // Update state
    const from = Number(this.dragged.dataset.index);
    const to = Number(this.over.dataset.index);
    log('From %s => %s', from, to);
    if (!isNaN(to) && onBookmarkMove) {
      onBookmarkMove({ from, to });
    }
  }

  onDragOver(event) {
    // log('Drag Over', event);
    event.preventDefault();
    this.dragged.style.display = 'none';
    if (event.target.className === 'placeholder') return;
    this.over = event.target;
    event.target.parentNode.insertBefore(placeholder, event.target);
  }

  onBookmarkClick(index, stateId) {
    if (this.props.onBookmarkClick) {
      this.props.onBookmarkClick(index, stateId);
    }
  }

  render() {
    const {
      bookmarks,
      onBookmarkClick,
    } = this.props;

    const bookmarkViews = bookmarks.map((s, index) => (
      <Bookmark
        {...s}
        key={`bookmark::${s.stateId}`}
        index={index}
        draggable
        onDragStart={event => this.onBookmarkDragStart(event)}
        onDragEnd={event => this.onBookmarkDragEnd(event)}
        onClick={() => this.onBookmarkClick(index, s.stateId)}
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
      <div className="state-list-container" onDragOver={event => this.onDragOver(event)}>
        {bookmarkViews.concat([endSentinel])}
      </div>
    );
  }
}

export default BookmarkList;
