
import React, { PropTypes } from 'react';
import './ItemInfo.scss';
import Continuation from '../Continuation';
import { ItemLabel } from './ItemLabel';
import { colors } from '../../palette';

const DO_NOTHING = () => ({});

const continuationColor = (isActive, isPinned) => {
  let result = colors.CONT_BLANK;
  if (isPinned) {
    result = colors.CONT_PINNED;
  } else if (isActive) {
    result = colors.CONT_ACTIVE;
  }
  return result;
};

const ItemInfo = ({
  continuation,
  label,
  onClick,
  onContinuationClick,
  active,
  pinned,
}) => {
  const renderedContinuation = continuation ? (
    <Continuation
      numContinuations={continuation.numContinuations}
      color={continuationColor(active, pinned)}
      onClick={onContinuationClick || DO_NOTHING}
    />
  ) : null;
  return (
    <div className="history-item-info" onClick={onClick || DO_NOTHING}>
      {renderedContinuation}
      <ItemLabel {...{ label, active }} />
    </div>
  );
};

ItemInfo.propTypes = {
  itemKey: PropTypes.string,
  label: PropTypes.string.isRequired,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }),
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
  active: PropTypes.bool,
  pinned: PropTypes.bool,
};

export default ItemInfo;
