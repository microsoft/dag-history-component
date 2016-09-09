import React, { PropTypes } from 'react';
import BranchProfile from '../BranchProfile';
import ItemInfo from '../ItemInfo';
import EditBranch from './EditBranch';
const DO_NOTHING = () => ({});
import './Branch.scss';

class Branch extends React.Component {
  constructor() {
    super();
    this.state = { editMode: false };
  }

  onClickEdit() {
    this.setState({ editMode: true });
  }

  onDoneEditing() {
    this.setState({ editMode: false });
  }

  onChanged(payload) {
    this.props.onRename(payload);
  }

  render() {
    const {
      label,
      continuation,
      branchType,
      startsAt,
      endsAt,
      currentBranchStart,
      currentBranchEnd,
      maxDepth,
      activeStateIndex,
      onClick,
      onContinuationClick,
      active,
      itemKey,
      successorDepth,
      continuationActive,
      pinnedStateIndex,
    } = this.props;
    const {
      editMode,
    } = this.state;

    return editMode ? (
      <EditBranch
        {...this.props}
        onDoneEditing={() => this.onDoneEditing()}
        onRename={p => this.onChanged(p)}
      />
    ) : (
      <div className="history-branch" onClick={onClick || DO_NOTHING}>
        <div className="history-branch-profile-container">
          <BranchProfile
            start={startsAt}
            end={endsAt}
            max={maxDepth}
            pinnedStateIndex={pinnedStateIndex}
            branchStart={currentBranchStart}
            branchEnd={currentBranchEnd}
            type={branchType}
            successorStateIndex={successorDepth}
            activeStateIndex={activeStateIndex}
          />
        </div>
        <div className="branch-details">
          <ItemInfo
            itemKey={itemKey}
            continuation={continuation}
            label={label}
            onContinuationClick={onContinuationClick || DO_NOTHING}
            active={active}
            continuationActive={continuationActive}
          />
        </div>
      </div>
    );
  }
}

Branch.propTypes = {
  itemKey: PropTypes.string,
  label: PropTypes.string.isRequired,
  activeStateIndex: PropTypes.number,
  continuation: PropTypes.shape({
    count: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }),
  startsAt: PropTypes.number.isRequired,
  endsAt: PropTypes.number.isRequired,
  maxDepth: PropTypes.number.isRequired,
  pinnedStateIndex: PropTypes.number,
  successorDepth: PropTypes.number,
  currentBranchStart: PropTypes.number,
  currentBranchEnd: PropTypes.number,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
  onRename: PropTypes.func,
  active: PropTypes.bool,
  continuationActive: PropTypes.bool,
};

export default Branch;
