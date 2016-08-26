import React, { PropTypes } from 'react';
import './Bookmark.scss';

import {
  MdKeyboardArrowDown as CloseIcon,
} from 'react-icons/lib/md';

export default class EditBookmark extends React.Component {
  componentDidMount() {
    this.refs.label.focus();
  }

  onClickDone() {
    const { onDoneEditing } = this.props;
    this.executeChange();
    onDoneEditing();
  }

  executeChange() {
    const {
      name: existingName,
      annotation: existingAnnotation,
      onBookmarkChange,
    } = this.props;

    const name = this.refs.label.value;
    const annotation = this.refs.annotation.value;
    const nameChanged = name !== existingName;
    const annotationChanged = annotation !== existingAnnotation;
    const isBookmarkUpdated = nameChanged || annotationChanged;

    if (isBookmarkUpdated) {
      onBookmarkChange({ name, data: { annotation } });
    }
  }

  render() {
    const {
      name,
      index,
      annotation,
      selected,
      onClick,
    } = this.props;

    return (
      <div
        className={`history-bookmark ${selected ? 'selected' : ''}`}
        data-index={index}
      >
        <div className="bookmark-details-editable">
          <div style={{ display: 'flex' }}>
            <input
              className="bookmark-input"
              tabIndex={0}
              ref="label"
              name="bookmarkLabel"
              type="text"
              default="Bookmark Label"
              defaultValue={name}
              onFocus={onClick}
              onBlur={() => this.executeChange()}
            />
            <div
              tabIndex={0}
              onKeyPress={() => this.onClickDone()}
              onClick={() => this.onClickDone()}
            >
              <CloseIcon style={{ padding: 4, marginRight: 4 }} size={30} />
            </div>
          </div>
          <textarea
            className="bookmark-input"
            tabIndex={0}
            ref="annotation"
            name="bookmarkAnnotation"
            cols="40"
            rows="5"
            placeholder="Presentation Text"
            defaultValue={annotation}
            onFocus={onClick}
            onBlur={() => this.executeChange()}
          >
          </textarea>
        </div>
      </div>
    );
  }
}
EditBookmark.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  annotation: PropTypes.string.isRequired,
  onBookmarkChange: PropTypes.func,
  onDoneEditing: PropTypes.func,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
