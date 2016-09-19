import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Bookmark.scss';
import EditBookmark from './EditBookmark';

const DO_NOTHING = () => ({});

class Bookmark extends React.Component {
  onBookmarkChangeDone(payload) {
    this.props.onBookmarkChange(payload);
  }

  render() {
    const {
      name,
      onClick,
      active,
      draggable,
      onDragStart,
      onDragEnd,
      onEdit,
      index,
      annotation,
      edit,
    } = this.props;

    return edit ? (
      <EditBookmark
        {...this.props}
        // focusOn={focusOn}
        onDoneEditing={onEdit}
        onBookmarkChange={p => this.onBookmarkChangeDone(p)}
      />
    ) : (
      <div
        className={`history-bookmark ${active ? 'selected' : ''}`}
        onClick={onClick || DO_NOTHING}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        data-index={index}
      >
        <div className="bookmark-details">
          <div
            className={classnames('bookmark-title', { active })}
            onClick={onEdit}
          >
            {name}
          </div>
          <div
            className="bookmark-annotation"
            onClick={onEdit}
          >
            {annotation}
          </div>
        </div>
      </div>
    );
  }
}
Bookmark.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  annotation: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onBookmarkChange: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  edit: PropTypes.bool,
};

export default Bookmark;
