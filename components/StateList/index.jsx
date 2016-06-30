import React, { PropTypes } from 'react';
import State from '../State';
require('./StateList.sass');

const StateList = ({
  states,
  activeStateId,
}) => {
  const stateViews = states.map(s => (
    <State
      key={`state:${s.id}`}
      label={s.label}
      active={s.id === activeStateId}
      branchType={s.branchType}
      continuation={s.continuation}
    />
  ));
  return (
    <div className="history-state-list">
      {stateViews}
    </div>
  );
};

StateList.propTypes = {
  activeStateId: PropTypes.string.isRequired,
  states: PropTypes.arrayOf(React.PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
    continuation: PropTypes.shape({
      numContinuations: PropTypes.number,
      isSelected: PropTypes.bool,
    }).isRequired,
  })),
};

export default StateList;
