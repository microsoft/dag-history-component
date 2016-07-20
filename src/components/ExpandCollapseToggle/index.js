import React, { PropTypes } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/lib/md';

const ExpandCollapseToggle = ({ isExpanded, onClick }) => (
  isExpanded ?
    <MdExpandLess onClick={onClick} /> :
    <MdExpandMore onClick={onClick} />
);
ExpandCollapseToggle.propTypes = {
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
export default ExpandCollapseToggle;
