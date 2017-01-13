import * as React from "react";
import * as classnames from "classnames";
import './Bookmark.scss';
import EditBookmark from './EditBookmark';
import DiscoveryTrail from '../DiscoveryTrail';
const { PropTypes } = React;

export interface IBookmarkProps {
  name: string;
  onClick?: Function;
  active?: boolean;
  draggable?: boolean;
  onDragStart?: React.EventHandler<React.DragEvent<HTMLDivElement>>;
  onDragEnd?: React.EventHandler<React.DragEvent<HTMLDivElement>>;
  onDiscoveryTrailIndexClicked?: (index: number) => void;
  index: number;
  numLeadInStates?: number;
  annotation: string;
  onBookmarkChange?: Function;
  shortestCommitPath?: number[];
  selectedDepth?: number;
}

export interface IBookmarkState {
  editMode: boolean;
  focusOn?: string;
}

class Bookmark extends React.Component<IBookmarkProps, IBookmarkState> {
  public static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string.isRequired,
    annotation: PropTypes.string.isRequired,
    numLeadInStates: PropTypes.number,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    onBookmarkChange: PropTypes.func,
    onDiscoveryTrailIndexClicked: PropTypes.func,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    shortestCommitPath: PropTypes.arrayOf(PropTypes.number),
    selectedDepth: PropTypes.number,
  };

  public static defaultProps = {
    shortestCommitPath: [],
  }

  constructor() {
    super();
    this.state = { editMode: false };
  }

  onClickEdit(focusOn) {
    this.setState({ editMode: true, focusOn });
  }

  onDoneEditing() {
    this.setState({ editMode: false });
  }

  onDiscoveryTrailIndexClicked(index) {
    if (this.props.onDiscoveryTrailIndexClicked) {
      this.props.onDiscoveryTrailIndexClicked(index);
    }
  }

  onBookmarkChangeDone(payload) {
    if (this.props.onBookmarkChange) {
      this.props.onBookmarkChange(payload);
    }
  }

  private get commitPathLength() {
    const { shortestCommitPath } = this.props;
    return shortestCommitPath.length;
  }

  private get highlight() {
    const { selectedDepth } = this.props;
    if (selectedDepth === undefined && this.props.active) {
      return this.commitPathLength - 1;
    }
    return selectedDepth;
  }

  render() {
    const {
      name,
      onClick,
      active,
      draggable,
      onDragStart,
      onDragEnd,
      index,
      annotation,
      onBookmarkChange,
      shortestCommitPath,
      selectedDepth,
      numLeadInStates,
    } = this.props;
    const {
      editMode,
      focusOn,
    } = this.state;
    const { highlight } = this;

    const isDiscoveryTrailVisible = active && numLeadInStates > 0;
    const discoveryTrail = isDiscoveryTrailVisible ? (
      <DiscoveryTrail
        depth={this.commitPathLength - 1}
        highlight={highlight}
        leadIn={numLeadInStates}
        active={active}
        onIndexClicked={idx => this.onDiscoveryTrailIndexClicked(idx)}
      />
    ) : null;

    return editMode ? (
      <EditBookmark
        {...this.props}
        commitPathLength={this.commitPathLength - 1}
        selectedDepth={this.highlight}
        focusOn={focusOn}
        onDoneEditing={() => this.onDoneEditing()}
        onBookmarkChange={p => this.onBookmarkChangeDone(p)}
        onDiscoveryTrailIndexClicked={idx => this.onDiscoveryTrailIndexClicked(idx)}
        />
    ) : (
        <div
          className={`history-bookmark ${active ? 'selected' : ''}`}
          draggable={draggable}
          onDragStart={e => onDragStart ? onDragStart(e) : undefined}
          onDragEnd={e => onDragEnd ? onDragEnd(e) : undefined}
          data-index={index}
          >
          <div className="bookmark-details-container">
            <div className="bookmark-details" onClick={onClick ? () => onClick() : undefined}>
              <div
                className={classnames('bookmark-title', { active })}
                onClick={() => this.onClickEdit('title')}
                >
                {name}
              </div>
              <div
                className="bookmark-annotation"
                onClick={() => this.onClickEdit('annotation')}
                >
                {annotation}
              </div>
            </div>
            { discoveryTrail }
          </div>
        </div>
      );
  }
}

export default Bookmark;
