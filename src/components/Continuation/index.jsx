import React, { PropTypes } from 'react';
const DO_NOTHING = () => ({});
import './Continuation.scss';

function getContinuationText(count) {
  const sanecount = Math.abs(count || 0);
  let result;
  if (sanecount <= 1) {
    result = '';
  } else if (sanecount < 99) {
    result = `${sanecount}`;
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
  count,
  color,
  onClick,
}) => {
  const continuationText = getContinuationText(count);
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
  count: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Continuation;
