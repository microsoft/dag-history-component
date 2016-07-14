import React, { PropTypes } from 'react';
import { MdMoreVert } from 'react-icons/lib/md';
import './OptionDropdown.sass';

const OptionDropdown = ({ options }) => (
  <div className="dropdown">
    <MdMoreVert size={24} style={{ margin: 4 }} />
    <div className="dropdown-content">
      {
        options.map(({ label, onClick }) => (
          <a onClick={onClick}>{label}</a>
        ))
      }
    </div>
  </div>
);
OptionDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
};

export default OptionDropdown;
