require('debug').enable('*');
const log = require('debug')('HistoryVisual:components:History');
import * as React from 'react';

require('./History.sass');

const ENTER_KEY_CODE = 13;

function stateName(state) {
  const stateData = state.toJS ? state.toJS() : state;
  let result = 'unknown';
  if (stateData.metadata && stateData.metadata.label) {
    result = stateData.metadata.label;
  } else {
    log('wtf1', stateData);
  }

  return result;
}

/**
 * Pure, Functional Component for a Single History Item
 */
const HistoryItem = ({ stateId, state, type, onClick }) => {
  log('render history item');
  return (
    <div onClick={() => onClick()} className={`history-item-${type}`}>
      {stateName(state)} - {stateId}
    </div>
  );
};
HistoryItem.propTypes = {
  state: React.PropTypes.object,
  stateId: React.PropTypes.string,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAddBranchTextInput: false };
  }

  onAddClicked() {
    this.setState({ showAddBranchTextInput: true });
  }

  handleAddBranchKeypress(e) {
    if (e.charCode === ENTER_KEY_CODE) {
      const branchValue = this.refs.newBranchName.value;
      this.props.actions.createBranch(branchValue);
      this.refs.newBranchName.value = '';
      this.setState({ showAddBranchTextInput: false });
    }
  }

  render() {
    log('render history');
    const {
      present,
      actions: {
        jumpToBranch,
        jumpToState,
      },
      currentStateId,
      future,
      past,
      branch,
      availableBranches,
    } = this.props;
    const {
      showAddBranchTextInput,
    } = this.state;
    return (
      <div className="history-view">
        <div className="history-view-controls">
          <div>
            <span className="history-view-branch-label">Branch:</span>
            <select
              className="history-select-branch"
              value={branch}
              onChange={(e) => jumpToBranch(e.target.value)}
            >
                {
                    availableBranches.map(b => <option key={`branch:${b}`} value={b} >{b}</option>)
                }
            </select>
          </div>
          <div className="history-view-add" onClick={() => this.onAddClicked()}>+</div>
        </div>
        <div>
          {
            showAddBranchTextInput ? (
              <input
                ref="newBranchName"
                className="new-branch-input"
                placeholder="new-branch"
                onKeyPress={this.handleAddBranchKeypress}
              />
            ) : null
          }
        </div>
        <div className="history-item-container">
          {
            future.map((p) => {
              const key = `hist_future:${p.id}`;
              return (
                <HistoryItem
                  stateId={p.id}
                  key={key}
                  type="future"
                  state={p.state}
                  onClick={() => jumpToState(p.id)}
                />
              );
            }).reverse()
          }
          <HistoryItem type="present" state={present} stateId={currentStateId} />
          {
            past.map((p) => {
              const key = `hist_past:${p.id}`;
              return (
                <HistoryItem
                  stateId={p.id}
                  key={key}
                  type="past"
                  state={p.state}
                  onClick={() => jumpToState(p.id)}
                />
              );
            }).reverse()
          }
        </div>
      </div>
    );
  }
}

History.propTypes = {
  present: React.PropTypes.object,
  actions: React.PropTypes.object,
  future: React.PropTypes.array,
  past: React.PropTypes.array,
  branch: React.PropTypes.string,
  availableBranches: React.PropTypes.array,
  currentStateId: React.PropTypes.string,
};
