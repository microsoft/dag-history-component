import React, { PropTypes } from 'react';
import State from '../State';
require('./StateList.sass');

const StateList = ({
  states,
}) => {
  const stateViews = states.map(s => <State {...s} />);
  return (
    <div className="history-state-list">
      {stateViews}
    </div>
  );
};

StateList.propTypes = {
  states: PropTypes.arrayOf(React.PropTypes.shape(State.propTypes)),
};

export default StateList;
