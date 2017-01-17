import * as React from "react";
import Bookmark from '../Bookmark';
import './BookmarkList.scss';

const { PropTypes } = React;
const { DropTarget } = require('react-dnd');

const log = require('debug')('@essex/redux-dag-history:BookmarkList');

export interface IBookmarkListProps {
  bookmarks: any[];
  onBookmarkClick?: Function;
  onSelectState?: Function;
  onSelectBookmarkDepth?: Function;
  connectDropTarget?: Function;

  draggedIndex?: number;
  hoverIndex?: number;
}

export default class BookmarkList extends React.PureComponent<IBookmarkListProps, {}> {
  public static propTypes = {
    onBookmarkClick: PropTypes.func,
    onBookmarkMove: PropTypes.func,
    onSelectState: PropTypes.func,
    bookmarks: PropTypes.arrayOf(
      React.PropTypes.shape(Bookmark.propTypes)
    ).isRequired,
  };

  onBookmarkClick(index, stateId) {
    if (this.props.onBookmarkClick) {
      this.props.onBookmarkClick(index, stateId);
    }
  }

  render() {
    const {
      bookmarks,
      onBookmarkClick,
      onSelectState,
      onSelectBookmarkDepth,
      connectDropTarget,
      draggedIndex,
      hoverIndex,
    } = this.props;

    let bookmarkViews = bookmarks.map((s, index) => (
      <Bookmark
        {...s}
        hoverIndex={hoverIndex}
        key={`bookmark::${s.stateId}`}
        index={index}
        onSelectBookmarkDepth={onSelectBookmarkDepth}
        onClick={() => this.onBookmarkClick(index, s.stateId)}
        onDiscoveryTrailIndexClicked={selectedIndex => {
          const target = s.shortestCommitPath[selectedIndex];
          onSelectBookmarkDepth({ target, depth: selectedIndex, state: target });
          onSelectState(target);
        }}
      />
    ));

    if (hoverIndex >= 0 && hoverIndex !== draggedIndex) {
      const dragged = bookmarkViews[draggedIndex];
      const adjustedHoverIndex = hoverIndex < draggedIndex ? hoverIndex : hoverIndex - 1;
      bookmarkViews.splice(draggedIndex, 1);
      bookmarkViews.splice(adjustedHoverIndex, 0, dragged);
    }
    return (
      <div className="state-list-container">
        <div className="bookmark-list">
          {bookmarkViews}
        </div>
      </div>
    );
  }
}
