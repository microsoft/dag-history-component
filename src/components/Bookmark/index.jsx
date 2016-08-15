import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
const DO_NOTHING = () => ({});
import './Bookmark.scss';
import EditBookmark from './EditBookmark';
import {
  MdEdit,
} from 'react-icons/lib/md';

class Bookmark extends React.Component {
  constructor() {
    super();
    this.state = { editMode: false };
  }

  onClickEdit() {
    this.setState({ editMode: true });
  }

  onBookmarkChangeDone(payload) {
    this.setState({ editMode: false });
    this.props.onBookmarkChange(payload);
  }

  render() {
    const {
      itemKey,
      name,
      onClick,
      onContinuationClick,
      active,
      continuation,
      draggable,
      onDragStart,
      onDragEnd,
      index,
    } = this.props;
    const {
      editMode,
    } = this.state;

    return editMode ? (
      <EditBookmark
        {...this.props}
        onBookmarkChange={p => this.onBookmarkChangeDone(p)}
      />
    ) : (
      <div
        className="history-bookmark"
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
            continuation={continuation}
            onContinuationClick={onContinuationClick || DO_NOTHING}
            active={active}
          />
          <div
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
            tabIndex={0}
            onKeyPress={() => this.onClickEdit()}
          >
            <MdEdit
              style={{ padding: 4, marginRight: 4 }}
              size={25}
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
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
  onBookmarkChange: PropTypes.func,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default Bookmark;
