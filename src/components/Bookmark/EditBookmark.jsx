import React, { PropTypes } from 'react';
import './Bookmark.scss';

export default class EditBookmark extends React.Component {
  componentDidMount() {
    const { focusOn } = this.props;
    const target = this[`${focusOn}Component`];
    if (target) {
      target.focus();
    }
  }

  onClickDone() {
    const { onDoneEditing } = this.props;
    this.executeChange();
    onDoneEditing();
  }

  onDone(e) {
    const { currentTarget } = e;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.onClickDone();
      }
    }, 0);
  }

  setTitleComponent(c) {
    this.titleComponent = c;
  }

  setAnnotationComponent(c) {
    this.annotationComponent = c;
  }

  executeChange(event) {
    const {
      name: existingName,
      annotation: existingAnnotation,
      onBookmarkChange,
    } = this.props;

    const name = this.titleComponent.value;
    const annotation = this.annotationComponent.value;
    const nameChanged = name !== existingName;
    const annotationChanged = annotation !== existingAnnotation;
    const isBookmarkUpdated = nameChanged || annotationChanged;

    if (isBookmarkUpdated) {
      onBookmarkChange({ name, data: { annotation } });
    }

    if (event) {
      const relatedTarget = event.relatedTarget;
      const isTargetHere = relatedTarget === this.titleComponent ||
        relatedTarget === this.annotationComponent;
      if (isTargetHere) {
        event.stopPropagation();
      }
    }
  }

  render() {
    const {
      name,
      index,
      annotation,
      active,
      onClick,
    } = this.props;

    return (
      <div
        className={`history-bookmark ${active ? 'selected' : ''}`}
        data-index={index}
      >
        <div className="bookmark-details-editable" onBlur={e => this.onDone(e)}>
          <div style={{ display: 'flex' }}>
            <input
              className="bookmark-input"
              tabIndex={0}
              ref={c => this.setTitleComponent(c)}
              name="bookmarkLabel"
              type="text"
              default="Bookmark Label"
              defaultValue={name}
              onFocus={onClick}
              onBlur={e => this.executeChange(e)}
            />
          </div>
          <textarea
            style={{ marginTop: 5 }}
            className="bookmark-input"
            tabIndex={0}
            ref={c => this.setAnnotationComponent(c)}
            name="bookmarkAnnotation"
            cols="40"
            rows="5"
            placeholder="Enter caption for presentation"
            defaultValue={annotation}
            onFocus={onClick}
            onBlur={e => this.executeChange(e)}
          />
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
  active: PropTypes.bool,
  onClick: PropTypes.func,
  focusOn: PropTypes.string,
};
