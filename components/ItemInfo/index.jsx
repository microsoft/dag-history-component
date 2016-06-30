import React, { PropTypes } from 'react';
import Continuation from '../Continuation';
require('./ItemInfo.sass');

const ItemInfo = ({ continuation, label }) => (
  <div className="history-item-info">
    <Continuation
      numContinuations={continuation.numContinuations}
      isSelected={continuation.isSelected}
    />
    <span className="label">{label}</span>
  </div>
);

ItemInfo.propTypes = {
  label: PropTypes.string.isRequired,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
};

export default ItemInfo;
