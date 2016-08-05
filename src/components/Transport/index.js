// import { MdPlayArrow } from 'react-icons/lib/md';
import React, { PropTypes } from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/lib/md';
require('./Transport.sass');

const Transport = ({
  iconSize,
  onSkipToStart,
  onBack,
  onForward,
  onSkipToEnd,
}) => (
  <div className="history-transport-panel">
    <MdSkipPrevious size={iconSize} onClick={onSkipToStart} />
    <MdKeyboardArrowLeft size={iconSize} onClick={onBack} />
    <MdKeyboardArrowRight size={iconSize} onClick={onForward} />
    <MdSkipNext size={iconSize} onClick={onSkipToEnd} />
  </div>
);
Transport.propTypes = {
  iconSize: PropTypes.number.isRequired,
  onSkipToStart: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onSkipToEnd: PropTypes.func.isRequired,
};
export default Transport;
