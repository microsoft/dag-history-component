import React, { PropTypes } from 'react';
import './Bookmark.scss';

import {
  MdDone,
} from 'react-icons/lib/md';

export default class EditBookmark extends React.Component {
  componentDidMount() {
    this.refs.label.focus();
  }

  onClickDone() {
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
    } = this.props;

    return (
      <div
        className="history-bookmark"
        data-index={index}
      >
        <div className="bookmark-details-editable">
          <input
            tabIndex={0}
            ref="label"
            name="bookmarkLabel"
            type="text"
            default="Bookmark Label"
            defaultValue={name}
          />
          <textarea
            tabIndex={0}
            ref="annotation"
            name="bookmarkAnnotation"
            cols="40"
            rows="5"
            placeholder="Presentation Text"
            defaultValue={annotation}
          >
          </textarea>
          <div
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
            tabIndex={0}
            onKeyPress={() => this.onClickDone()}
          >
            <MdDone
              style={{ padding: 4, marginRight: 4 }}
              size={25}
              onClick={() => this.onClickDone()}
            />
          </div>
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
};
