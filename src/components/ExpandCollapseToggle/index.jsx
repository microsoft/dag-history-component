import React, { PropTypes } from 'react';
import MdExpandMore from 'react-icons/lib/md/expand-more';
import MdExpandLess from 'react-icons/lib/md/expand-less';

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
