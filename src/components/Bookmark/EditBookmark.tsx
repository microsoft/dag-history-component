import * as React from 'react';
import './Bookmark.scss';
const { PropTypes } = React;
import StatePager from '../StatePager';

export interface IEditBookmarkProps {
  name: string;
  annotation: string;
  index: number;
  numLeadInStates?: number;
  active?: boolean;
  onClick?: Function;
  onBookmarkChange?: Function;
  commitPathLength?: number;
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
  private leadInComponent: HTMLSelectElement;

  public static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string.isRequired,
    annotation: PropTypes.string.isRequired,
    numLeadInStates: PropTypes.number,
    commitPathLength: PropTypes.number,
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

  public componentDidMount() {
    this.annotationComponent.focus();
  }

  private onDone() {
    const { onDoneEditing } = this.props;
    onDoneEditing();
  }

  private setAnnotationComponent(c) {
    this.annotationComponent = c;
  }

  private setLeadInComponent(c) {
    this.leadInComponent = c;
  }

  private executeChange(event) {
    if (!event) {
      return;
    }
    const {
      annotation: existingAnnotation,
      numLeadInStates: existingNumLeadInStates,
      onBookmarkChange,
    } = this.props;

    const annotation = this.annotationComponent.value;

    const numLeadInStatesValue = this.leadInComponent.value;
    const numLeadInStates: number = numLeadInStatesValue === 'all' ?
      undefined :
      Number.parseInt(numLeadInStatesValue);

    const isBookmarkUpdated = annotation !== existingAnnotation ||
      numLeadInStates !== existingNumLeadInStates;

    if (isBookmarkUpdated && onBookmarkChange) {
      onBookmarkChange({
        name: this.props.name,
        data: {
          annotation,
          numLeadInStates,
        },
      });
    }

    const relatedTarget = event.relatedTarget;
    const isTargetHere = relatedTarget === this.titleComponent ||
      relatedTarget === this.annotationComponent;
    if (isTargetHere) {
      event.stopPropagation();
    }
  }

  public render() {
    const {
      name,
      index,
      annotation,
      active,
      onClick,
      shortestCommitPath,
      commitPathLength,
      selectedDepth,
      numLeadInStates,
    } = this.props;

    const leadInStatesValue = numLeadInStates !== undefined ? `${numLeadInStates}` : 'all';

    return (
      <div
        className={`history-bookmark ${active ? 'selected' : ''}`}
        data-index={index}
      >
        <div className="bookmark-details-editable">
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
          <div className="bookmark-controls-container">
            <div className="bookmark-controls">
              <span>Show</span>
              <select
                ref={c => this.setLeadInComponent(c)}
                style={{marginLeft: 5, marginRight: 5}}
                onChange={e => this.executeChange(e)}
                value={leadInStatesValue}
              >
                <option value="all">all</option>
                <option value="0">no</option>
                <option value="1">one</option>
                <option value="2">two</option>
                <option value="3">three</option>
                <option value="4">four</option>
                <option value="5">five</option>
              </select>
              <span>lead-in states</span>
            </div>
            <button onClick={() => this.onDone()}>
              DONE
            </button>
          </div>
          <StatePager
            depth={commitPathLength}
            highlight={selectedDepth}
            leadIn={numLeadInStates}
            active={active}
          />
        </div>
      </div>
    );
  }
}
