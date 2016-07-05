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
const DO_NOTHING = () => ({});

const State = ({
  label,
  branchType,
  active,
  continuation,
  onClick,
  onContinuationClick,
}) => {
  const backgroundColor = coloring[branchType][active ? 'active' : 'nonactive'];
  return (
    <div className="history-state" style={{ backgroundColor }} onClick={onClick || DO_NOTHING}>
      <ItemInfo
        label={label}
        continuation={continuation}
        onContinuationClick={onContinuationClick || DO_NOTHING}
      />
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
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
};

export default State;
