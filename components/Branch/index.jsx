import React, { PropTypes } from 'react';
import BranchProfile from '../BranchProfile';
import ItemInfo from '../ItemInfo';
require('./Branch.sass');

const Branch = ({
  label,
  continuation,
  branchType,
  startsAt,
  endsAt,
  maxDepth,
}) => (
  <div className="history-branch">
    <div className="history-branch-profile-container">
      <BranchProfile start={startsAt} end={endsAt} max={maxDepth} type={branchType} />
    </div>
    <div className="branch-details">
      <ItemInfo continuation={continuation} label={label} />
    </div>
  </div>
);

Branch.propTypes = {
  label: PropTypes.string.isRequired,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired,
  startsAt: PropTypes.number.isRequired,
  endsAt: PropTypes.number.isRequired,
  maxDepth: PropTypes.number.isRequired,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
};

export default Branch;
