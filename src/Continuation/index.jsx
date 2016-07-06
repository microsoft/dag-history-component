import React, { PropTypes } from 'react';
const SELECTED_COLOR = '#5DFA48';
const NOT_SELECTED_COLOR = 'white';
const DO_NOTHING = () => ({});

function getContinuationText(numContinuations) {
  const saneNumContinuations = Math.abs(numContinuations);
  let result;
  if (saneNumContinuations <= 1) {
    result = '';
  } else if (saneNumContinuations < 99) {
    result = `${saneNumContinuations}`;
  } else {
    result = '99+';
  }
  return result;
}

const Continuation = ({
  numContinuations,
  isSelected,
  onClick,
}) => {
  const backgroundColor = isSelected ? SELECTED_COLOR : NOT_SELECTED_COLOR;
  const continuationText = getContinuationText(numContinuations);
  return (
    <div
      className="history-state-continuations"
      style={{ backgroundColor }}
      onClick={onClick || DO_NOTHING}
    >
      {continuationText}
    </div>
  );
};

Continuation.propTypes = {
  numContinuations: PropTypes.number,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Continuation;
