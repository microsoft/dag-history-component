import React, { PropTypes } from 'react';
import classnames from 'classnames';
import BranchProfile from '../BranchProfile';
import EditBranch from './EditBranch';
import './Branch.scss';

const DO_NOTHING = () => ({});

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
      branchType,
      startsAt,
      endsAt,
      currentBranchStart,
      currentBranchEnd,
      maxDepth,
      activeStateIndex,
      onClick,
      active,
      successorDepth,
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
          <div className={classnames('branch-name', { active })}>
            {label}
          </div>
        </div>
      </div>
    );
  }
}

Branch.propTypes = {
  label: PropTypes.string.isRequired,
  activeStateIndex: PropTypes.number,
  startsAt: PropTypes.number.isRequired,
  endsAt: PropTypes.number.isRequired,
  maxDepth: PropTypes.number.isRequired,
  pinnedStateIndex: PropTypes.number,
  successorDepth: PropTypes.number,
  currentBranchStart: PropTypes.number,
  currentBranchEnd: PropTypes.number,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  onClick: PropTypes.func,
  onRename: PropTypes.func,
  active: PropTypes.bool,
};

export default Branch;
