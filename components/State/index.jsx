import React, { PropTypes } from 'react';
import Continuation from '../Continuation';

require('./State.sass');

const coloring = {
  current: {
    active: '#4DD2FF',
    nonactive: '#B3E4F5',
  },
  legacy: {
    active: '#BFBFBF',
    nonactive: '#E3E3E3',
  },
};
const State = ({
  label,
  branchType,
  active,
  numContinuations,
  isContinuationSelected,
}) => {
  const backgroundColor = coloring[branchType][active ? 'active' : 'nonactive'];
  return (
    <div className="history-state" style={{ backgroundColor }}>
      <Continuation numContinuations={numContinuations} isSelected={isContinuationSelected} />
      <span className="history-state-label">{label}</span>
    </div>
  );
};

State.propTypes = {
  label: PropTypes.string.required,
  branchType: PropTypes.oneOf(['current', 'legacy']).required,
  active: PropTypes.bool,
  numContinuations: PropTypes.number,
  isContinuationSelected: PropTypes.bool,
};

export default State;
