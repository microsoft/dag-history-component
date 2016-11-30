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
  source: string;
  label: string;
  active?: boolean;
  pinned?: boolean;
  continuationActive?: boolean;
  bookmarked?: boolean;
  renderBookmarks?: boolean;
  branchType: 'current' | 'legacy';
  isSuccessor?: boolean;
  continuation: IContinuationProps;
  onBookmarkClick?: Function;
  onClick: React.EventHandler<React.MouseEvent<any>>;
  onContinuationClick: Function;
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
  let bookmark = null;
  if (renderBookmarks) {
    bookmark = (
      <Bookmark
        size={25}
        color={bookmarked ? 'gold' : 'white'}
        onClick={e => onBookmarkClick ? onBookmarkClick(e) : undefined}
      />
    );
  }
  return (
    <div className="history-state" style={{ backgroundColor }} onClick={e => onClick ? onClick(e) : undefined}>
      <Continuation
        {...continuation}
        color={continuationColor(active, pinned)}
        onClick={() => onContinuationClick ? onContinuationClick() : undefined}
      />
      <div className="state-detail">
        <div className={classnames('state-source', { active })}>
          {source}
        </div>
        <div className={classnames('state-name', { active })}>
          {label}
        </div>
      </div>
      {bookmark}
    </div>
  );
};

State.propTypes = {
  id: PropTypes.number,
  source: PropTypes.string,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  pinned: PropTypes.bool,
  continuationActive: PropTypes.bool,
  bookmarked: PropTypes.bool,
  renderBookmarks: PropTypes.bool,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  isSuccessor: PropTypes.bool,
  continuation: PropTypes.shape(Continuation.propTypes).isRequired,
  onBookmarkClick: PropTypes.func,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
};

export default State;
