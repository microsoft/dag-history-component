import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Bookmark.scss';
import EditBookmark from './EditBookmark';

const DO_NOTHING = () => ({});

class Bookmark extends React.Component {
  constructor() {
    super();
    this.state = { editMode: false };
  }

  onClickEdit(focusOn) {
    this.setState({ editMode: true, focusOn });
  }

  onDoneEditing() {
    this.setState({ editMode: false });
  }

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
      index,
      annotation,
    } = this.props;
    const {
      editMode,
      focusOn,
    } = this.state;

    return editMode ? (
      <EditBookmark
        {...this.props}
        focusOn={focusOn}
        onDoneEditing={() => this.onDoneEditing()}
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
            onClick={() => this.onClickEdit('title')}
          >
            {name}
          </div>
          <div
            className="bookmark-annotation"
            onClick={() => this.onClickEdit('annotation')}
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
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default Bookmark;
