import * as React from 'react';
import { connect } from 'react-redux';
import { IBookmark } from '../interfaces';
import HistoryComponent from './History';
import '../daghistory.scss';

const { PropTypes } = React;

export interface IHistoryContainerStateProps {
  history?: any,
  mainView?: string;
  historyType?: string;
  branchContainerExpanded?: boolean;
  highlightSuccessorsOf?: number;
  selectedBookmark?: number;
  selectedBookmarkDepth?: number;
  bookmarks?: IBookmark[];
}

export interface IHistoryContainerDispatchProps {
}

export interface IHistoryContainerOwnProps extends IHistoryContainerStateProps {
  controlBar: any;
  bookmarksEnabled?: boolean;
  getSourceFromState: Function;
}

export interface IHistoryContainerProps extends IHistoryContainerStateProps, IHistoryContainerDispatchProps, IHistoryContainerOwnProps {
}

const HistoryContainer: React.StatelessComponent<IHistoryContainerProps> = (props) => {
  return (<HistoryComponent {...props} />);
};

HistoryContainer.propTypes = {
  /**
   * ControlBar Configuration Properties
   */
  controlBar: PropTypes.shape({
    /**
     * A handler to save the history tree out. This is handled by clients.
     */
    onSaveHistory: PropTypes.func,

    /**
     * A handler to retrieve the history tree. This is handled by clients
     */
    onLoadHistory: PropTypes.func,

    /**
     * A function that emits a Promise<boolean> that confirms the clear-history operation.
     */
    onConfirmClear: PropTypes.func,
  }),

  /**
   * Bookbark Configuration Properties
   */
  bookmarksEnabled: PropTypes.bool,
  getSourceFromState: PropTypes.func.isRequired,

  // Props injected from redux state
  history: PropTypes.object,
  highlightSuccessorsOf: PropTypes.number,
  mainView: PropTypes.string,
  historyType: PropTypes.string,
  dragIndex: PropTypes.number,
  dragKey: PropTypes.string,
  hoverIndex: PropTypes.number,
  branchContainerExpanded: PropTypes.bool,
  selectedBookmark: PropTypes.number,
  selectedBookmarkDepth: PropTypes.number,
  isPlayingBack: PropTypes.bool,
};

export default function createHistoryContainer(getMiddlewareState: Function, getComponentState: Function) {
  const mapStateToProps = (state) => {
    const middleware = getMiddlewareState(state);
    const component = getComponentState(state);
    return {
      // State from the redux-dag-history middleware
      history: middleware,
      highlightSuccessorsOf: middleware.pinnedStateId,

      // State from the dag-history-component
      bookmarks: component.bookmarks,
      mainView: component.views.mainView,
      historyType: component.views.historyType,
      dragIndex: component.dragDrop.sourceIndex,
      dragKey: state.component.dragDrop.sourceKey,
      hoverIndex: component.dragDrop.hoverIndex,
      branchContainerExpanded: component.views.branchContainerExpanded,
      selectedBookmark: component.playback.bookmark,
      selectedBookmarkDepth: component.playback.depth,
      isPlayingBack: component.playback.isPlayingBack,
    };
  };
  return connect<IHistoryContainerStateProps, IHistoryContainerDispatchProps, IHistoryContainerOwnProps>(mapStateToProps)(HistoryContainer);
};
