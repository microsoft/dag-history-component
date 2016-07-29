const log = require('debug')('dag-history-component:OptionDropdown');
import React, { PropTypes } from 'react';
import { MdMoreVert } from 'react-icons/lib/md';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import * as _ from 'lodash';
require('./OptionDropdown.sass');

const handleClick = (label, onClick) => _.debounce(() => {
  log('handling option click for %s', label);
  onClick();
}, 100);

const OptionDropdown = ({
  label,
  options,
  triggerClass,
  contentClass,
}) => {
  let result = null;
  if (options.length === 0) {
    result = label ? (
      <div className={`dropdown-label-only ${triggerClass}`}>
        {label}
      </div>
    ) : <div />;
  } else {
    const trigger = label ?
      <div className="label">{label}</div> :
      <div className="dropown-icon-wrapper">
        <MdMoreVert size={24} style={{ margin: 4 }} />
      </div>;

    result = (
      <Dropdown options={{ show: false }}>
        <DropdownTrigger className={`dropdown__trigger ${triggerClass}`}>
          {trigger}
        </DropdownTrigger>
        <DropdownContent className={`dropdown__content ${contentClass}`}>
          <ul>
          {
            options.map(({ label: optionLabel, onClick }, index) => (
              <li key={`option:${index}`} onClick={handleClick(label, onClick)}>{optionLabel}</li>
            ))
          }
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }
  return result;
};
OptionDropdown.propTypes = {
  label: PropTypes.string,
  triggerClass: PropTypes.string,
  contentClass: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
};

export default OptionDropdown;
