import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
const DO_NOTHING = () => ({});
import './Bookmark.scss';

import {
  MdEdit,
  MdDone,
} from 'react-icons/lib/md';

class Bookmark extends React.Component {
  constructor() {
    super();
    this.state = { editMode: false };
  }

  onClickEdit() {
    this.setState({ editMode: true });
  }

  onClickDone() {
    const {
      name,
      annotation: existingAnnotation,
      onBookmarkChange,
    } = this.props;

    const newName = this.refs.label.value;
    const annotation = this.refs.annotation.value;
    const nameChanged = newName !== name;
    const annotationChanged = annotation !== existingAnnotation;
    const isBookmarkUpdated = nameChanged || annotationChanged;

    if (isBookmarkUpdated) {
      onBookmarkChange({ name, data: { annotation } });
    }
    this.setState({ editMode: false });
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
      annotation,
    } = this.props;
    const {
      editMode,
    } = this.state;

    return editMode ? (
      <div
        className="history-bookmark"
        data-index={index}
      >
        <div className="bookmark-details-editable">
          <input
            ref="label"
            name="bookmarkLabel"
            type="text"
            default="Bookmark Label" defaultValue={name}
          />
          <textarea
            ref="annotation"
            name="bookmarkAnnotation"
            cols="40"
            rows="5"
            placeholder="Presentation Text"
            defaultValue={annotation}
          >
          </textarea>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <MdDone
              style={{ padding: 4, marginRight: 4 }}
              size={25}
              onClick={() => this.onClickDone()}
            />
          </div>
        </div>
      </div>
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
          <MdEdit
            style={{ padding: 4, marginRight: 4 }}
            size={25}
            onClick={() => this.onClickEdit()}
          />
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
