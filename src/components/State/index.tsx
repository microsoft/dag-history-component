import * as React from 'react';
import State from './State';
import { IExpandableStateProps } from './interfaces';
import StateWithSuccessors from './StateWithSuccessors';
import { IContinuationProps } from '../Continuation';

const ExpandableState: React.StatelessComponent<IExpandableStateProps> = (props) => {
  const {
    id,
    pinned,
    active,
    successor,
    isBookmarked,
    branchType,
    historyGraph,
    getSourceFromState,
    onClick,
    onContinuationClick,
    onBookmarkClick,
    renderBookmarks,
  } = props;

  const children = historyGraph.childrenOf(id);
  const getSourceAndLabel = (stateId: number) => {
    const state = historyGraph.getState(id);
    const source = getSourceFromState(state);
    const label = historyGraph.stateName(id);
    return { source, label };
  };

  const stateProps = {
    id,
    pinned,
    active,
    successor,
    bookmarked: isBookmarked(id),
    branchType,
    onClick,
    onContinuationClick,
    onBookmarkClick,
    numChildren: children.length,
    renderBookmarks,
    ...getSourceAndLabel(id),
  };

  const isExpanded = pinned && children.length > 1;
  if (isExpanded) {
    const childrenProps = children.map(id => {
      return {
        id,
        bookmarked: isBookmarked(id),
        successor: true,
        numChildren: historyGraph.childrenOf(id).length,
        onClick,
        onContinuationClick,
        onBookmarkClick,
        renderBookmarks,
        ...getSourceAndLabel(id),
      };
    });
    const stateWithSuccessorsProps = {
      ...stateProps,
      childStates: childrenProps,
    };
    return (<StateWithSuccessors {...stateWithSuccessorsProps} />);
  } else {
    return (<State {...stateProps} />);
  }
};
export default ExpandableState;
