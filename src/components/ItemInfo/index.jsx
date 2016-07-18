import React, { PropTypes } from 'react';
const classnames = require('classnames');
import Continuation from '../Continuation';
require('./ItemInfo.sass');
const DO_NOTHING = () => ({});

const ItemInfo = ({
  continuation,
  label,
  onClick,
  onContinuationClick,
  active,
}) => (
  <div className="history-item-info" onClick={onClick || DO_NOTHING}>
    <Continuation
      numContinuations={continuation.numContinuations}
      isSelected={continuation.isSelected}
      onClick={onContinuationClick || DO_NOTHING}
    />
    <span className={classnames('label', { active })}>{label}</span>
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
  active: PropTypes.bool,
};

export default ItemInfo;
