import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
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
  continuation,
}) => {
  const backgroundColor = coloring[branchType][active ? 'active' : 'nonactive'];
  return (
    <div className="history-state" style={{ backgroundColor }}>
      <ItemInfo label={label} continuation={continuation} />
    </div>
  );
};

State.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
};

export default State;
