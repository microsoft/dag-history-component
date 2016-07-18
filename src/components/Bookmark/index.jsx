import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
const DO_NOTHING = () => ({});
require('./Bookmark.sass');

const Bookmark = ({
  name,
  onClick,
  onContinuationClick,
  active,
  continuation,
}) => (
  <div className="history-bookmark" onClick={onClick || DO_NOTHING}>
    <div className="bookmark-details">
      <ItemInfo
        label={name}
        continuation={continuation}
        onContinuationClick={onContinuationClick || DO_NOTHING}
        active={active}
      />
    </div>
  </div>
);

Bookmark.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
};

export default Bookmark;
