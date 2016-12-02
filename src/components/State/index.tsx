import * as React from "react";
import * as classnames from "classnames";
import { default as Continuation, IContinuationProps } from '../Continuation';
import colors from '../../palette';
import './State.scss';

const Bookmark = require('react-icons/lib/io/bookmark');
const { PropTypes } = React;

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

function continuationColor(isActive, isPinned) {
  let result = colors.CONT_BLANK;
  if (isPinned) {
    result = colors.CONT_PINNED;
  } else if (isActive) {
    result = colors.CONT_ACTIVE;
  }
  return result;
}

export interface IStateProps {
  id?: number;
  source?: string;
  label?: string;
  active?: boolean;
  pinned?: boolean;
  bookmarked?: boolean;
  renderBookmarks?: boolean;
  branchType?: 'current' | 'legacy';
  isSuccessor?: boolean;
  continuation?: IContinuationProps;
  onBookmarkClick?: Function;
  onClick?: React.EventHandler<React.MouseEvent<any>>;
  onContinuationClick?: Function;
}

const State: React.StatelessComponent<IStateProps> = ({
  source,
  label,
  branchType,
  active,
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

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  }

  const handleContinuationClick = (e) => {
    if (onContinuationClick) {
      onContinuationClick(e);
    }
  }

  const handleBookmarkClick = (e) => {
    if (onBookmarkClick) {
      onBookmarkClick(e);
    }
  }

  return (
    <div
      className="history-state"
      style={{ backgroundColor }}
      onClick={e => handleClick(e)}
    >
      <Continuation
        {...continuation}
        color={continuationColor(active, pinned)}
        onClick={(e) => handleContinuationClick(e)}
      />
      <div className="state-detail">
        <div className={classnames('state-source', { active })}>
          {source || ''}
        </div>
        <div className={classnames('state-name', { active })}>
          {label || ''}
        </div>
      </div>
      {
        renderBookmarks &&
          <Bookmark
            size={25}
            color={bookmarked ? 'gold' : 'white'}
            onClick={e => handleBookmarkClick(e)}
          />
      }
    </div>
  );
};

State.propTypes = {
  id: PropTypes.number,
  source: PropTypes.string,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  pinned: PropTypes.bool,
  bookmarked: PropTypes.bool,
  renderBookmarks: PropTypes.bool,
  branchType: PropTypes.oneOf(['current', 'legacy']),
  isSuccessor: PropTypes.bool,
  continuation: PropTypes.shape(Continuation.propTypes),
  onBookmarkClick: PropTypes.func,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
};
State.defaultProps = {
  continuation: {},
  branchType: 'current',
};

export default State;
