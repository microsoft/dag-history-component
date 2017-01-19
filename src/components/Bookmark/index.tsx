import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classnames from "classnames";
import './Bookmark.scss';
import EditBookmark from './EditBookmark';
import DiscoveryTrail from '../DiscoveryTrail';
import {
  bookmarkDragStart,
  bookmarkDragHover,
  bookmarkDragDrop,
  bookmarkDragCancel,
} from '../../state/actions/creators';
import { debounce } from 'lodash';

const {
  DragSource,
  DropTarget,
} = require('react-dnd');
const { connect } = require('react-redux');

const { PropTypes } = React;

export interface IBookmarkDragProps {
  // Injected by React DnD:
  isDragging?: boolean;
  connectDragSource?: Function;
  connectDropTarget?: Function;
  hoverIndex?: number,
}

export interface IBookmarkProps extends IBookmarkDragProps {
  name: string;
  onClick?: Function;
  active?: boolean;
  onDiscoveryTrailIndexClicked?: (index: number) => void;
  onSelectBookmarkDepth?: Function;
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

const fireHoverEvent = debounce((dispatch, index) => dispatch(bookmarkDragHover({ index })));

const dropTargetSpec = {
  drop(props, monitor, component) {
    const { index } = props;
    return { index };
  },
  hover(props, monitor, component) {
    if (!monitor.isOver()) {
      return;
    }
    const { dispatch, index } = props;
    const domNode = ReactDOM.findDOMNode(component);
    const { clientWidth: width, clientHeight: height } = domNode;

    const rect = domNode.getBoundingClientRect();
    const clientY = monitor.getClientOffset().y;
    const midline = rect.top + ((rect.bottom - rect.top) / 2);

    if (clientY < midline) {
      // insert hover into the hover slot, pushing the hovered item forward
      fireHoverEvent(dispatch, index);
    } else {
      // insert hover into next slot
      fireHoverEvent(dispatch, index + 1);
    }
  }
};

const dragSource = {
  beginDrag(props) {
    const { index, dispatch } = props;
    dispatch(bookmarkDragStart({ index }));
    return { index };
  },
  endDrag(props, monitor, component) {
    const { dispatch } = props;
    const item = monitor.getItem();
    dispatch(bookmarkDragDrop({
      index: item.index,
      droppedOn: props.hoverIndex,
    }));
  },
};

@connect()
@DragSource("BOOKMARK", dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@DropTarget("BOOKMARK", dropTargetSpec, (connect, monitor) => {
  return { connectDropTarget: connect.dropTarget() };
})
export default class Bookmark extends React.PureComponent<IBookmarkProps, IBookmarkState> {
  public static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string.isRequired,
    annotation: PropTypes.string.isRequired,
    numLeadInStates: PropTypes.number,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    onBookmarkChange: PropTypes.func,
    onDiscoveryTrailIndexClicked: PropTypes.func,
    shortestCommitPath: PropTypes.arrayOf(PropTypes.number),
    selectedDepth: PropTypes.number,
    onSelectBookmarkDepth: PropTypes.func,

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func,

    // D&D Related
    hoverIndex: PropTypes.number,
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
      index,
      isDragging,
      annotation,
      onBookmarkChange,
      shortestCommitPath,
      selectedDepth,
      numLeadInStates,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    const {
      editMode,
      focusOn,
    } = this.state;
    const { highlight } = this;

    const isDiscoveryTrailVisible = active && numLeadInStates > 0;
    const discoveryTrail = isDiscoveryTrailVisible ? (
      <DiscoveryTrail
        fullWidth
        depth={this.commitPathLength - 1}
        highlight={highlight}
        leadIn={numLeadInStates}
        active={active}
        onIndexClicked={idx => this.onDiscoveryTrailIndexClicked(idx)}
      />
    ) : null;

    if (isDragging) {
      return <div className="bookmark-dragged" />
    } else if (editMode) {
      return (
      <EditBookmark
        {...this.props}
        commitPathLength={this.commitPathLength - 1}
        selectedDepth={this.highlight}
        focusOn={focusOn}
        onDoneEditing={() => this.onDoneEditing()}
        onBookmarkChange={p => this.onBookmarkChangeDone(p)}
        onDiscoveryTrailIndexClicked={idx => this.onDiscoveryTrailIndexClicked(idx)}
        />
      );
    } else {
      return connectDropTarget(connectDragSource(
        <div
          className={`history-bookmark ${active ? 'selected' : ''}`}
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
      ));
    }
  }
}
