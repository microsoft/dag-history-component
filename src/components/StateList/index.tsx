import * as React from 'react';
import State, { IStateProps } from '../State';
import isNumber from '../../util/isNumber';

export interface IStateListProps {
  states: IStateProps[];
  activeStateId?: number;
  onStateClick?: Function;
  onStateContinuationClick?: Function;
  renderBookmarks?: boolean;
  onStateBookmarkClick?: Function;
}

const StateList: React.StatelessComponent<IStateListProps> = ({
  states,
  activeStateId,
  onStateClick,
  onStateContinuationClick,
  renderBookmarks,
  onStateBookmarkClick,
}) => {

  const handleClick = (id) => {
    if (onStateClick) {
      onStateClick(id);
    }
  };

  const handleContinuationClick = (id) => {
    if (onStateContinuationClick) {
      onStateContinuationClick(id);
    }
  }

  const handleBookmarkClick = (id) => {
    if (onStateBookmarkClick) {
      onStateBookmarkClick(id);
    }
  };

  const stateViews = states.map((s, index) => (
    <State
      {...s}
      {...{ renderBookmarks }}
      key={`state:${s.id}:${index}`}
      active={isNumber(activeStateId) && s.id === activeStateId}
      onClick={() => handleClick(s.id)}
      onContinuationClick={() => handleContinuationClick(s.id)}
      onBookmarkClick={() => handleBookmarkClick(s.id)}
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
  activeStateId: React.PropTypes.number,
  onStateClick: React.PropTypes.func,
  onStateContinuationClick: React.PropTypes.func,
  renderBookmarks: React.PropTypes.bool,
  onStateBookmarkClick: React.PropTypes.func,
};

export default StateList;
