import * as React from 'react';
import { connect } from 'react-redux';
import { IBookmark } from '../../interfaces';
import '../../daghistory.scss';
import HistoryComponent from '../History';

const { PropTypes, Children } = React;

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
  bindTransportKeysGlobally?: boolean;
  getSourceFromState: Function;
}

export interface IHistoryContainerProps extends IHistoryContainerStateProps, IHistoryContainerDispatchProps, IHistoryContainerOwnProps {
}

const HistoryContainer: React.StatelessComponent<IHistoryContainerProps> = (props) => {
  return Children.only(<HistoryComponent {...props} />);
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
  bindTransportKeysGlobally: PropTypes.bool,
  getSourceFromState: PropTypes.func.isRequired,

  // Props injected from redux state
  history: PropTypes.object,
  highlightSuccessorsOf: PropTypes.number,
  mainView: PropTypes.string,
  historyType: PropTypes.string,
  dragIndex: PropTypes.number,
  hoverIndex: PropTypes.number,
  branchContainerExpanded: PropTypes.bool,
  selectedBookmark: PropTypes.number,
  selectedBookmarkDepth: PropTypes.number,
  isPlayingBack: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    // State from the redux-dag-history middleware
    history: state.app,
    highlightSuccessorsOf: state.app.pinnedStateId,

    // State from the dag-history-component
    bookmarks: state.component.bookmarks,
    mainView: state.component.views.mainView,
    historyType: state.component.views.historyType,
    dragIndex: state.component.dragDrop.sourceIndex,
    hoverIndex: state.component.dragDrop.hoverIndex,
    branchContainerExpanded: state.component.views.branchContainerExpanded,
    selectedBookmark: state.component.playback.bookmark,
    selectedBookmarkDepth: state.component.playback.depth,
    isPlayingBack: state.component.playback.isPlayingBack,
  };
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
      hoverIndex: component.dragDrop.hoverIndex,
      branchContainerExpanded: component.views.branchContainerExpanded,
      selectedBookmark: component.playback.bookmark,
      selectedBookmarkDepth: component.playback.depth,
      isPlayingBack: component.playback.isPlayingBack,
    };
  };
  return connect<IHistoryContainerStateProps, IHistoryContainerDispatchProps, IHistoryContainerOwnProps>(mapStateToProps)(HistoryContainer);
};
