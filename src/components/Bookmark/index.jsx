import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
const DO_NOTHING = () => ({});
require('./Bookmark.sass');

const Bookmark = ({
  itemKey,
  name,
  onClick,
  onContinuationClick,
  active,
  continuation,
  onLabelChange,
}) => (
  <div className="history-bookmark" onClick={onClick || DO_NOTHING}>
    <div className="bookmark-details">
      <ItemInfo
        itemKey={itemKey}
        label={name}
        editable
        continuation={continuation}
        onContinuationClick={onContinuationClick || DO_NOTHING}
        active={active}
        onLabelChange={onLabelChange}
      />
    </div>
  </div>
);

Bookmark.propTypes = {
  itemKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
  onLabelChange: PropTypes.func,
};

export default Bookmark;
