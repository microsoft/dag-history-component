
import React, { PropTypes } from 'react';
import './ItemInfo.scss';
import Continuation from '../Continuation';
import { ItemLabel } from './ItemLabel';
import { colors } from '../../palette';

const DO_NOTHING = () => ({});

const ItemInfo = ({
  continuation,
  label,
  onClick,
  onContinuationClick,
  active,
}) => {
  const renderedContinuation = continuation ? (
    <Continuation
      numContinuations={continuation.numContinuations}
      color={active ? colors.CONT_ACTIVE : colors.CONT_BLANK}
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
};

export default ItemInfo;
