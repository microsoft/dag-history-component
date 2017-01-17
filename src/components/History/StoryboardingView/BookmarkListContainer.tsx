import * as React from 'react';
import DagGraph from '@essex/redux-dag-history/lib/DagGraph';
import { IDagHistory } from '@essex/redux-dag-history/lib/interfaces';
import * as DagHistoryActions from '@essex/redux-dag-history/lib/ActionCreators';
import * as Actions from '../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookmarkList from '../../BookmarkList';

const log = require('debug')('dag-history-component:components:StoryboardingView');

export interface IBookmarkListContainerStateProps {
  draggedIndex?: number;
  hoverIndex?: number;
}

export interface IBookmarkListContainerDispatchProps {
  onSelectBookmark: Function;
  onBookmarkChange: Function;
  onSelectState: Function;
  onSelectBookmarkDepth: Function;
}

export interface IBookmarkListContainerOwnProps {
  history: IDagHistory<any>;
  selectedBookmark?: number;
  selectedBookmarkDepth?: number;
}

export interface IBookmarkListContainerProps extends
  IBookmarkListContainerStateProps,
  IBookmarkListContainerDispatchProps,
  IBookmarkListContainerOwnProps{
}

const BookmarkListContainer: React.StatelessComponent<IBookmarkListContainerProps> = (props: IBookmarkListContainerProps) => {
  const {
    history: {
      bookmarks,
      graph,
    },
    onSelectBookmark,
    onBookmarkChange,
    onSelectState,
    onSelectBookmarkDepth,
    selectedBookmark: selectedBookmarkIndex,
    selectedBookmarkDepth: selectedBookmarkDepthIndex,
    draggedIndex,
    hoverIndex,
  } = props;
  const historyGraph = new DagGraph(graph);
  const { currentStateId } = historyGraph;

  const bookmarkData = bookmarks.map((b, index) => {
    // The bookmark is selected if it's the currently defined selection (the user has clicked on it) or
    // if the user has not clicked on a bookmark yet, and this bookmark represents the current state.
    const isForCurrentState = b.stateId === currentStateId;
    const active = selectedBookmarkIndex === index || (selectedBookmarkIndex === undefined && isForCurrentState);

    const shortestCommitPath = historyGraph.shortestCommitPath(b.stateId);
    let selectedDepth;
    if (active) {
      selectedDepth = selectedBookmarkDepthIndex;
    } else {
      const currentStateIndex = shortestCommitPath.indexOf(currentStateId);
      selectedDepth = currentStateIndex === -1 ? undefined : currentStateIndex;
    }

    return {
      ...b,
      active,
      annotation: b.data['annotation'] || '',
      numLeadInStates: b.data['numLeadInStates'],
      onBookmarkChange: ({ name, data }) => onBookmarkChange({ bookmark: b.stateId, name, data }),
      shortestCommitPath,
      selectedDepth,
    };
  });
  return (
    <BookmarkList
      draggedIndex={draggedIndex}
      hoverIndex={hoverIndex}
      bookmarks={bookmarkData}
      onBookmarkClick={(index, state) => onSelectBookmark(index, state)}
      onSelectState={onSelectState}
      onSelectBookmarkDepth={onSelectBookmarkDepth}
    />
  );
};
BookmarkListContainer.propTypes = {
  history: React.PropTypes.object.isRequired,
  onSelectBookmark: React.PropTypes.func.isRequired,
  onBookmarkChange: React.PropTypes.func.isRequired,
  onSelectState: React.PropTypes.func,
  selectedBookmark: React.PropTypes.number,
  selectedBookmarkDepth: React.PropTypes.number,
  draggedIndex: React.PropTypes.number,
  hoverIndex: React.PropTypes.number,
};

export default connect<IBookmarkListContainerStateProps, IBookmarkListContainerDispatchProps, IBookmarkListContainerOwnProps>(
  (state) => ({
    draggedIndex: state.history.bookmarkDragDropSourceIndex,
    hoverIndex: state.history.bookmarkDragDropHoverIndex,
  }),
  dispatch => bindActionCreators({
    onSelectBookmark: Actions.selectBookmark,
    onBookmarkChange: DagHistoryActions.changeBookmark,
    onSelectState: DagHistoryActions.jumpToState,
    onSelectBookmarkDepth: Actions.selectBookmarkDepth,
  }, dispatch)
)(BookmarkListContainer);
