import * as React from 'react';
import State, { IStateProps } from '../State';

export interface IStateListProps {
  states: IStateProps[];
  activeStateId: number;
  onStateClick: Function;
  onStateContinuationClick: Function;
  renderBookmarks?: boolean;
  onStateBookmarkClick: Function;
}

const StateList: React.StatelessComponent<IStateListProps> = ({
  states,
  activeStateId,
  onStateClick,
  onStateContinuationClick,
  renderBookmarks,
  onStateBookmarkClick,
}) => {
  const stateViews = states.map((s, index) => (
    <State
      {...s}
      {...{ renderBookmarks }}
      key={`state:${s.id}:${index}`}
      active={s.id === activeStateId}
      onClick={() => onStateClick ? onStateClick(s.id) : undefined}
      onContinuationClick={() => onStateContinuationClick ? onStateContinuationClick(s.id) : undefined}
      onBookmarkClick={() => onStateBookmarkClick ? onStateBookmarkClick(s.id) : undefined}
    />
  ));
  return (
    <div className="state-list-container">
      {stateViews}
    </div>
  );
};

StateList.propTypes = {
  states: React.PropTypes.arrayOf(React.PropTypes.shape(State.propTypes)).isRequired,
  activeStateId: React.PropTypes.number.isRequired,
  onStateClick: React.PropTypes.func.isRequired,
  onStateContinuationClick: React.PropTypes.func.isRequired,
  renderBookmarks: React.PropTypes.bool,
  onStateBookmarkClick: React.PropTypes.func.isRequired,
};

export default StateList;
