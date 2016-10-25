import React, { PropTypes } from 'react';
import keydown, { Keys } from 'react-keydown';
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import MdSkipNext from 'react-icons/lib/md/skip-next';
import MdSkipPrevious from 'react-icons/lib/md/skip-previous';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdPause from 'react-icons/lib/md/pause';

import './Transport.scss';

class Transport extends React.Component {
  @keydown(Keys.SPACE)
  play() {
    if (this.props.onPlay) {
      this.props.onPlay();
    }
  }

  @keydown(Keys.ESC)
  pause() {
    if (this.props.onPlay) {
      this.props.onPlay();
    }
  }

  @keydown(Keys.LEFT)
  back() {
    this.props.onBack();
  }

  @keydown(Keys.RIGHT)
  forward() {
    this.props.onForward();
  }

  @keydown('shift+left')
  skiptoStart() {
    this.props.onSkipToStart();
  }

  @keydown('shift+right')
  skipToEnd() {
    this.props.onSkipToEnd();
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
      showPause,
    } = this.props;
    const handleKeyPress = () => ({});
    return (
      <div className="history-transport-panel" onKeyPress={handleKeyPress} tabIndex="0">
        <MdSkipPrevious size={iconSize} onClick={onSkipToStart} />
        <MdKeyboardArrowLeft size={iconSize} onClick={onBack} />
        {showPlay ? <MdPlayArrow size={iconSize} onClick={onPlay} /> : null}
        {showPause ? <MdPause size={iconSize} onClick={onPlay} /> : null}
        <MdKeyboardArrowRight size={iconSize} onClick={onForward} />
        <MdSkipNext size={iconSize} onClick={onSkipToEnd} />
      </div>
    );
  }
}
Transport.propTypes = {
  showPlay: PropTypes.bool,
  showPause: PropTypes.bool,
  iconSize: PropTypes.number.isRequired,
  onSkipToStart: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onSkipToEnd: PropTypes.func.isRequired,
  onPlay: PropTypes.func,
};
export default Transport;
