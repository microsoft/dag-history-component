import React, { PropTypes } from 'react';
import Continuation from '../Continuation';
require('./ItemInfo.sass');

const DO_NOTHING = () => ({});

const ItemInfo = ({
  continuation,
  label,
  onClick,
  onContinuationClick,
}) => (
  <div className="history-item-info" onClick={onClick || DO_NOTHING}>
    <Continuation
      numContinuations={continuation.numContinuations}
      isSelected={continuation.isSelected}
      onClick={onContinuationClick || DO_NOTHING}
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
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
};

export default ItemInfo;
