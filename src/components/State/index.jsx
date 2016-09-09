import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
import { colors } from '../../palette';
import Bookmark from 'react-icons/lib/io/bookmark';
import './State.scss';

const coloring = {
  current: {
    active: colors.CURRENT_ACTIVE,
    nonactive: colors.CURRENT,
  },
  legacy: {
    active: colors.LEGACY_ACTIVE,
    nonactive: colors.ANCESTOR,
  },
  pinned: colors.SUCCESSOR_PIN,
  successor: colors.SUCCESSOR_ACTIVE,
};
const DO_NOTHING = () => ({});

function getBackgroundColor(isPinned, isSuccessor, branchType, active) {
  let result = null;
  if (isPinned) {
    result = coloring.pinned;
  } else if (isSuccessor) {
    result = coloring.successor;
  } else {
    result = coloring[branchType][active ? 'active' : 'nonactive'];
  }
  return result;
}

const State = ({
  label,
  branchType,
  active,
  continuationActive,
  renderBookmarks,
  bookmarked,
  continuation,
  onClick,
  onContinuationClick,
  onBookmarkClick,
  pinned,
  isSuccessor,
}) => {
  const backgroundColor = getBackgroundColor(pinned, isSuccessor, branchType, active);
  let bookmark = null;
  if (renderBookmarks) {
    bookmark = (
      <Bookmark
        size={25}
        color={bookmarked ? 'gold' : '#e8e8e8'}
        onClick={onBookmarkClick || DO_NOTHING}
      />
    );
  }
  return (
    <div className="history-state" style={{ backgroundColor }} onClick={onClick || DO_NOTHING}>
      <ItemInfo
        label={label}
        continuation={continuation}
        onContinuationClick={onContinuationClick || DO_NOTHING}
        active={active}
        pinned={pinned}
        continuationActive={continuationActive}
      />
      {bookmark}
    </div>
  );
};

State.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  pinned: PropTypes.bool,
  continuationActive: PropTypes.bool,
  bookmarked: PropTypes.bool,
  renderBookmarks: PropTypes.bool,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  isSuccessor: PropTypes.bool,
  continuation: PropTypes.shape({
    count: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
  onBookmarkClick: PropTypes.func,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
};

export default State;
