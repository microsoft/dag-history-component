import React, { PropTypes } from 'react';
import State from '../State';
require('./StateList.sass');

const StateList = ({
  states,
}) => {
  const stateViews = states.map(s => (
    <State
      key={`state:${s.id}`}
      label={s.label}
      active={s.active}
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
  states: PropTypes.arrayOf(React.PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
    branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
    continuation: PropTypes.shape({
      numContinuations: PropTypes.number,
      isSelected: PropTypes.bool,
    }).isRequired,
  })),
};

export default StateList;
