import * as React from 'react';
import './Bookmark.scss';
const { PropTypes } = React;

export interface IEditBookmarkProps {
  name: string;
  annotation: string;
  index: number;
  active?: boolean;
  onClick?: Function;
  onBookmarkChange?: Function;
  focusOn?: string;
  onDoneEditing?: Function;
}

export interface IEditBookmarkState {
}

export default class EditBookmark extends React.Component<IEditBookmarkProps, IEditBookmarkState> {
  private titleComponent: HTMLInputElement;
  private annotationComponent: HTMLTextAreaElement;

  public static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string.isRequired,
    annotation: PropTypes.string.isRequired,
    onBookmarkChange: PropTypes.func,
    onDoneEditing: PropTypes.func,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    focusOn: PropTypes.string,
  };

  componentDidMount() {
    const { focusOn } = this.props;
    if (focusOn) {
      const target = this[`${focusOn}Component`];
      if (target) {
        target.focus();
      }
    }
  }

  onClickDone() {
    const { onDoneEditing } = this.props;
    if (onDoneEditing) {
      onDoneEditing();
    }
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
    if (!event) {
      return;
    }
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

    if (isBookmarkUpdated && onBookmarkChange) {
      onBookmarkChange({ name, data: { annotation } });
    }

    const relatedTarget = event.relatedTarget;
    const isTargetHere = relatedTarget === this.titleComponent ||
      relatedTarget === this.annotationComponent;
    if (isTargetHere) {
      event.stopPropagation();
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
              className="bookmark-input bookmark-title"
              tabIndex={0}
              ref={c => this.setTitleComponent(c)}
              name="bookmarkLabel"
              type="text"
              placeholder="Bookmark Label"
              defaultValue={name}
              onFocus={() => onClick ? onClick() : undefined}
              onBlur={e => this.executeChange(e)}
            />
          </div>
          <textarea
            style={{ marginTop: 5 }}
            className="bookmark-input bookmark-annotation"
            tabIndex={0}
            ref={c => this.setAnnotationComponent(c)}
            name="bookmarkAnnotation"
            cols={40}
            rows={5}
            placeholder="Enter caption for presentation"
            defaultValue={annotation}
            onFocus={() => onClick()}
            onBlur={e => this.executeChange(e)}
          />
        </div>
      </div>
    );
  }
}
