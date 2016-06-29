import React, { PropTypes } from 'react';
import Continuation from '../Continuation';

require('./HistoryState.sass');

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
const HistoryState = ({
  label,
  type,
  active,
  numContinuations,
  isContinuationSelected,
}) => {
  const backgroundColor = coloring[type][active ? 'active' : 'nonactive'];
  return (
    <div className="history-state" style={{ backgroundColor }}>
      <Continuation numContinuations={numContinuations} isSelected={isContinuationSelected} />
      <span className="history-state-label">{label}</span>
    </div>
  );
};

HistoryState.propTypes = {
  label: PropTypes.string.required,
  type: PropTypes.oneOf(['current', 'legacy']).required,
  active: PropTypes.bool,
  numContinuations: PropTypes.number,
  isContinuationSelected: PropTypes.bool,
};

export default HistoryState;
