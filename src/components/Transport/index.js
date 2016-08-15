const log = require('debug')('dag-history-component:Transport');
import React, { PropTypes } from 'react';
import applykeydown from 'react-keydown';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSkipNext,
  MdSkipPrevious,
  MdPlayArrow,
} from 'react-icons/lib/md';
import './Transport.scss';

class Transport extends React.Component {
  componentWillReceiveProps({ keydown }) {
    if (keydown.event) {
      log('keydown', keydown.event);
    }
  }

  render() {
    const {
      iconSize,
      onSkipToStart,
      onBack,
      onForward,
      onSkipToEnd,
      onPlay,
      showPlay,
    } = this.props;
    const handleKeyPress = evt => {
      log('KEYPRESS', evt);
    };
    return (
      <div className="history-transport-panel" onKeyPress={handleKeyPress} tabIndex="0">
        <MdSkipPrevious size={iconSize} onClick={onSkipToStart} />
        <MdKeyboardArrowLeft size={iconSize} onClick={onBack} />
        {showPlay ? <MdPlayArrow size={iconSize} onClick={onPlay} /> : null}
        <MdKeyboardArrowRight size={iconSize} onClick={onForward} />
        <MdSkipNext size={iconSize} onClick={onSkipToEnd} />
      </div>
    );
  }
}
Transport.propTypes = {
  showPlay: PropTypes.bool,
  iconSize: PropTypes.number.isRequired,
  onSkipToStart: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onSkipToEnd: PropTypes.func.isRequired,
  onPlay: PropTypes.func,
};
export default applykeydown(Transport);
