import * as React from 'react';
import DagGraph from 'redux-dag-history/lib/DagGraph';
import { IDagHistory } from 'redux-dag-history/lib/interfaces';
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookmarkList from '../../BookmarkList';

const log = require('debug')('dag-history-component:components:StoryboardingView');

export interface IBookmarkListContainerStateProps {

}

export interface IBookmarkListContainerDispatchProps {

}

export interface IBookmarkListContainerOwnProps {
  history: IDagHistory<any>;
}

export interface IBookmarkListContainerProps extends
  IBookmarkListContainerStateProps,
  IBookmarkListContainerDispatchProps,
  IBookmarkListContainerOwnProps {
  onStateSelect: Function;
  onBookmarkChange: Function;
  onBookmarkMove: Function;
}

const BookmarkListContainer: React.StatelessComponent<IBookmarkListContainerProps> = (props: IBookmarkListContainerProps) => {
  const {
    history: {
      bookmarks,
      graph,
    },
    onStateSelect,
    onBookmarkChange,
    onBookmarkMove,
  } = props;
  const historyGraph = new DagGraph(graph);
  const { currentStateId } = historyGraph;
  const bookmarkData = bookmarks.map((b) => {
    const isSelected = b.stateId === currentStateId;
    return {
      ...b,
      active: isSelected,
      annotation: b.data['annotation'] || '',
      onBookmarkChange: ({ name, data }) => onBookmarkChange({ bookmark: b.stateId, name, data }),
    };
  });
  return (
    <BookmarkList
      bookmarks={bookmarkData}
      onBookmarkClick={id => onStateSelect(id)}
      onBookmarkMove={onBookmarkMove}
    />
  );
};
BookmarkListContainer.propTypes = {
  history: React.PropTypes.object.isRequired,
  onStateSelect: React.PropTypes.func.isRequired,
  onBookmarkChange: React.PropTypes.func.isRequired,
  onBookmarkMove: React.PropTypes.func.isRequired,
};

export default connect<IBookmarkListContainerStateProps, IBookmarkListContainerDispatchProps, IBookmarkListContainerOwnProps>(
  () => ({}),
  dispatch => bindActionCreators({
    onStateSelect: DagHistoryActions.jumpToState,
    onBookmarkChange: DagHistoryActions.changeBookmark,
    onBookmarkMove: DagHistoryActions.moveBookmark,
  }, dispatch)
)(BookmarkListContainer);
