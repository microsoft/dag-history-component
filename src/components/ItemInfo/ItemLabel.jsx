import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
const classnames = require('classnames');

class EditableItemLabel extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.textInput).focus();
  }

  render() {
    const { label, onChange, onStopEditing } = this.props;
    const onInputTextChange = (event) => {
      const value = event.target.value;
      if (event.key === 'Enter' && onChange) {
        onChange(value);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onStopEditing();
      }
    };

    return (
      <input
        ref="textInput"
        type="text"
        placeholder={label}
        className="rename-item-label"
        onKeyPress={onInputTextChange}
        onKeyDown={onKeyDown}
      />
    );
  }
}
EditableItemLabel.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onStopEditing: PropTypes.func.isRequired,
};

export const ItemLabel = ({ label, active, renaming, onChange, onStopEditing }) => (
  renaming ?
  (<EditableItemLabel {...{ label, active, renaming, onChange, onStopEditing }} />) :
  (<span className={classnames('label', { active })}>{label}</span>)
);

ItemLabel.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  renaming: PropTypes.bool,
  onChange: PropTypes.func,
  onStopEditing: PropTypes.func,
};
