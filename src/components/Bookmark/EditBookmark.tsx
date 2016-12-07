import * as React from 'react';
import './Bookmark.scss';
const { PropTypes } = React;
import StatePager from '../StatePager';

export interface IEditBookmarkProps {
  name: string;
  annotation: string;
  index: number;
  active?: boolean;
  onClick?: Function;
  onBookmarkChange?: Function;
  focusOn?: string;
  onDoneEditing?: Function;
  shortestCommitPath?: number[];
  selectedDepth: number;
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
    shortestCommitPath: PropTypes.arrayOf(PropTypes.number),
  };

  public static defaultProps = {
    shortestCommitPath: [],
  };

  componentDidMount() {
    this.annotationComponent.focus();
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

  setAnnotationComponent(c) {
    this.annotationComponent = c;
  }

  executeChange(event) {
    if (!event) {
      return;
    }
    const {
      annotation: existingAnnotation,
      onBookmarkChange,
    } = this.props;

    const annotation = this.annotationComponent.value;
    const isBookmarkUpdated= annotation !== existingAnnotation;

    if (isBookmarkUpdated && onBookmarkChange) {
      onBookmarkChange({
        name: this.props.name,
        data: { annotation },
      });
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
      shortestCommitPath,
      selectedDepth,
    } = this.props;

    return (
      <div
        className={`history-bookmark ${active ? 'selected' : ''}`}
        data-index={index}
      >
        <div className="bookmark-details-editable" onBlur={e => this.onDone(e)}>
          <div style={{ display: 'flex' }}>
            <div className="bookmark-title">{name}</div>
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
          <StatePager
            depth={shortestCommitPath.length}
            highlight={selectedDepth}
          />
        </div>
      </div>
    );
  }
}
