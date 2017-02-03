import * as React from "react";
import {default as Bookmark, IEditableBookmarkProps} from "./EditableBookmark";
const flow = require('lodash/flow');

export interface IDragDropBookmarkProps extends IEditableBookmarkProps {
  // Injected by React DnD:
  isDragging?: boolean;
  connectDragSource?: Function;
  connectDropTarget?: Function;
  dragIndex?: number;
  hoverIndex?: number;
  dispatch: Function;
}

export interface IDragDropBookmarkState {}

export default class DrapDropBookmark extends React.Component<IDragDropBookmarkProps, IDragDropBookmarkState> {
  private renderBookmark() {
    if (this.props.isDragging) {
      return (<div className="bookmark-dragged" />);
    } else {
      return (
        <div className="bookmark-dragdrop-wrapper">
          <Bookmark {...this.props} />
        </div>
      );
    }
  }

  public render() {
    const {
      connectDragSource,
      connectDropTarget,
    } = this.props;
    return flow(
      connectDragSource,
      connectDropTarget,
    )(
      this.renderBookmark(),
    );
  }
}
