import React, { PropTypes } from 'react';
require('./Continuation.sass');

const SELECTED_COLOR = '#5DFA48';
const NOT_SELECTED_COLOR = 'white';

const Continuation = ({
  numContinuations,
  isSelected,
}) => {
  const backgroundColor = isSelected ? SELECTED_COLOR : NOT_SELECTED_COLOR;
  return (
    <div
      className="history-state-continuations"
      style={{ backgroundColor }}
    >
      {numContinuations > 99 ? '99+' : numContinuations}
    </div>
  );
};

Continuation.propTypes = {
  numContinuations: PropTypes.number,
  isSelected: PropTypes.bool,
};

export default Continuation;
