import React, { PropTypes } from 'react';

import {
  MdKeyboardArrowDown as CloseIcon,
} from 'react-icons/lib/md';

export default class EditBranch extends React.Component {
  componentDidMount() {
    this.refs.label.focus();
  }

  onClickDone() {
    const { onDoneEditing } = this.props;
    this.executeChange();
    onDoneEditing();
  }

  executeChange() {
    const {
      label: existingName,
      onRename,
    } = this.props;

    const name = this.refs.label.value;
    const nameChanged = name !== existingName;
    const isUpdated = nameChanged;
    if (isUpdated) {
      onRename(name);
    }
  }

  render() {
    const {
      label,
    } = this.props;

    return (
      <div className="history-branch">
        <div className="branch-details-editable">
          <div style={{ display: 'flex' }}>
            <input
              className="branch-input"
              tabIndex={0}
              ref="label"
              name="branchLabel"
              type="text"
              default="Branch Name"
              defaultValue={label}
              style={{ flex: 1 }}
              onBlur={() => this.executeChange()}
            />
            <div
              tabIndex={0}
              onKeyPress={() => this.onClickDone()}
              onClick={() => this.onClickDone()}
            >
              <CloseIcon style={{ padding: 4, marginRight: 4 }} size={30} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditBranch.propTypes = {
  label: PropTypes.string.isRequired,
  onRename: PropTypes.func,
  onDoneEditing: PropTypes.func,
};
