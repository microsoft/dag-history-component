import React, { PropTypes } from 'react';
import HistoryState from '../HistoryState';
require('./HistoryStateList.sass');

const HistoryStateList = ({
  states,
}) => {
  const stateViews = states.map(s => <HistoryState {...s} />);
  return (
    <div className="history-state-list">
      {stateViews}
    </div>
  );
};

HistoryStateList.propTypes = {
  states: PropTypes.arrayOf(React.PropTypes.shape(HistoryState.propTypes)),
};

export default HistoryStateList;
