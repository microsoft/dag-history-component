import React, { PropTypes } from 'react';
import State from '../State';
require('./StateList.sass');
const DO_NOTHING = () => ({});

const StateList = ({
  states,
  activeStateId,
  onStateClick,
  onStateContinuationClick,
}) => {
  const stateViews = states.map(s => (
    <State
      key={`state:${s.id}`}
      label={s.label}
      active={s.id === activeStateId}
      branchType={s.branchType}
      continuation={s.continuation}
      onClick={() => (onStateClick || DO_NOTHING)(s.id)}
      onContinuationClick={() => (onStateContinuationClick || DO_NOTHING)(s.id)}
    />
  ));
  return (
    <div className="history-state-list">
      {stateViews}
    </div>
  );
};

StateList.propTypes = {
  activeStateId: PropTypes.number.isRequired,
  states: PropTypes.arrayOf(React.PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
    continuation: PropTypes.shape({
      numContinuations: PropTypes.number,
      isSelected: PropTypes.bool,
    }).isRequired,
  })),
  onStateClick: PropTypes.func,
  onStateContinuationClick: PropTypes.func,
};

export default StateList;
