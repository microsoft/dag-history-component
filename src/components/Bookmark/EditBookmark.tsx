import * as React from 'react';
import './Bookmark.scss';
const { PropTypes } = React;
import StatePager from '../StatePager';

const log = require('debug')('dag-history-component:components:Bookmark');

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

  private onDoneEditing() {
    const {
      annotation: existingAnnotation,
      numLeadInStates: existingNumLeadInStates,
      onBookmarkChange,
    } = this.props;

    const annotation = this.annotationComponent.value;
    const isBookmarkUpdated = annotation !== existingAnnotation;

    if (isBookmarkUpdated && onBookmarkChange) {
      onBookmarkChange({
        name: this.props.name,
        data: {
          annotation,
          numLeadInStates: existingNumLeadInStates,
        },
      });
    }
  }

  private onLeadInSet(value?: number) {
    const {
      annotation: existingAnnotation,
      numLeadInStates: existingNumLeadInStates,
      onBookmarkChange,
    } = this.props;

    const numLeadInStates = value !== undefined ? value : this.props.commitPathLength - this.props.selectedDepth;
    const isBookmarkUpdated = numLeadInStates !== existingNumLeadInStates;
    if (isBookmarkUpdated && onBookmarkChange) {
      onBookmarkChange({
        name: this.props.name,
        data: {
          annotation: existingAnnotation,
          numLeadInStates,
        },
      });
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
    const clearButton = (numLeadInStates === undefined) ? null : (
      <button style={{marginLeft: 5}} onClick={() => this.onLeadInSet(0)}>
        Clear intro
      </button>
    );
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
            onBlur={() => this.onDoneEditing()}
          />
          <div className="bookmark-controls-container">
            <button
              style={{marginLeft: 5}}
              onClick={(e) => this.onLeadInSet()}
            >
              Set intro
            </button>
            {clearButton}
            <button style={{marginLeft: 5}} onClick={() => this.onDone()}>
              Done
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
