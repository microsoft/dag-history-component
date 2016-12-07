import * as React from 'react';
import DagGraph from 'redux-dag-history/lib/DagGraph';
import { IDagHistory } from 'redux-dag-history/lib/interfaces';
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import * as Actions from '../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookmarkList from '../../BookmarkList';

const log = require('debug')('dag-history-component:components:StoryboardingView');

export interface IBookmarkListContainerStateProps {
}

export interface IBookmarkListContainerDispatchProps {
  onSelectBookmark: Function;
  onBookmarkChange: Function;
  onBookmarkMove: Function;
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
    onBookmarkMove,
    selectedBookmark: selectedBookmarkIndex,
    selectedBookmarkDepth: selectedBookmarkDepthIndex
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
      onBookmarkChange: ({ name, data }) => onBookmarkChange({ bookmark: b.stateId, name, data }),
      shortestCommitPath,
      selectedDepth,
    };
  });
  return (
    <BookmarkList
      bookmarks={bookmarkData}
      onBookmarkClick={(index, state) => onSelectBookmark(index, state)}
      onBookmarkMove={onBookmarkMove}
    />
  );
};
BookmarkListContainer.propTypes = {
  history: React.PropTypes.object.isRequired,
  onSelectBookmark: React.PropTypes.func.isRequired,
  onBookmarkChange: React.PropTypes.func.isRequired,
  onBookmarkMove: React.PropTypes.func.isRequired,
  selectedBookmark: React.PropTypes.number,
  selectedBookmarkDepth: React.PropTypes.number,
};

export default connect<IBookmarkListContainerStateProps, IBookmarkListContainerDispatchProps, IBookmarkListContainerOwnProps>(
  () => ({}),
  dispatch => bindActionCreators({
    onSelectBookmark: Actions.selectBookmark,
    onBookmarkChange: DagHistoryActions.changeBookmark,
    onBookmarkMove: DagHistoryActions.moveBookmark,
  }, dispatch)
)(BookmarkListContainer);
