import React, { PropTypes } from 'react';
const DO_NOTHING = () => ({});
require('./Continuation.sass');

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

function handleClick(handler) {
  return (evt) => {
    handler(evt);
    evt.stopPropagation();
  };
}

const Continuation = ({
  numContinuations,
  color,
  onClick,
}) => {
  const continuationText = getContinuationText(numContinuations);
  return (
    <div
      className="history-state-continuations"
      style={{ backgroundColor: color }}
      onClick={handleClick(onClick || DO_NOTHING)}
    >
      {continuationText}
    </div>
  );
};

Continuation.propTypes = {
  numContinuations: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Continuation;
