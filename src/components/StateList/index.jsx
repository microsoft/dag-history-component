import React, { PropTypes } from 'react';
import State from '../State';
const DO_NOTHING = () => ({});

const StateList = ({
  states,
  activeStateId,
  onStateClick,
  onStateContinuationClick,
  renderBookmarks,
  onStateBookmarkClick,
}) => {
  const stateViews = states.map(s => (
    <State
      {...s}
      {...{ renderBookmarks }}
      key={`state:${s.id}`}
      active={s.id === activeStateId}
      onClick={() => (onStateClick || DO_NOTHING)(s.id)}
      onContinuationClick={() => (onStateContinuationClick || DO_NOTHING)(s.id)}
      onBookmarkClick={() => (onStateBookmarkClick || DO_NOTHING)(s.id)}
    />
  ));
  return (
    <div className="state-list-container">
      {stateViews}
    </div>
  );
};

StateList.propTypes = {
  activeStateId: PropTypes.number.isRequired,
  states: PropTypes.arrayOf(React.PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
    bookmarked: PropTypes.bool,
    continuation: PropTypes.shape({
      count: PropTypes.number,
      isSelected: PropTypes.bool,
    }).isRequired,
  })),
  renderBookmarks: PropTypes.bool,
  onStateClick: PropTypes.func,
  onStateContinuationClick: PropTypes.func,
  onStateBookmarkClick: PropTypes.func,
};

export default StateList;
