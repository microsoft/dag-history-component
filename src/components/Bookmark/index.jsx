import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
const DO_NOTHING = () => ({});
import './Bookmark.scss';
import EditBookmark from './EditBookmark';
import {
  MdKeyboardArrowUp as EditIcon,
} from 'react-icons/lib/md';

class Bookmark extends React.Component {
  constructor() {
    super();
    this.state = { editMode: false };
  }

  componentDidMount() {
    if (this.props.active) {
      this.setState({ editMode: true }); // eslint-disable-line
    }
  }

  onClickEdit() {
    this.setState({ editMode: true });
  }

  onDoneEditing() {
    this.setState({ editMode: false });
  }

  onBookmarkChangeDone(payload) {
    this.props.onBookmarkChange(payload);
  }

  render() {
    const {
      itemKey,
      name,
      onClick,
      onContinuationClick,
      active,
      draggable,
      onDragStart,
      onDragEnd,
      index,
      annotation,
    } = this.props;
    const {
      editMode,
    } = this.state;

    return editMode ? (
      <EditBookmark
        {...this.props}
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
          <ItemInfo
            itemKey={itemKey}
            label={name}
            continuation={null}
            onContinuationClick={onContinuationClick || DO_NOTHING}
            active={active}
          />
          <div
            style={{ alignSelf: 'flex-end' }}
            tabIndex={0}
            onKeyPress={() => this.onClickEdit()}
          >
            <EditIcon
              size={30}
              onClick={() => this.onClickEdit()}
            />
          </div>
        </div>
      </div>
    );
  }
}
Bookmark.propTypes = {
  itemKey: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  annotation: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
  onBookmarkChange: PropTypes.func,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default Bookmark;
