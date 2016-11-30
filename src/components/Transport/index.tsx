import * as React from "react";
const { default: keydown, Keys } = require("react-keydown");
const MdKeyboardArrowLeft = require("react-icons/lib/md/keyboard-arrow-left");
const MdKeyboardArrowRight = require("react-icons/lib/md/keyboard-arrow-right");
const MdSkipNext = require("react-icons/lib/md/skip-next");
const MdSkipPrevious = require("react-icons/lib/md/skip-previous");
const MdPlayArrow = require("react-icons/lib/md/play-arrow");
const MdPause = require("react-icons/lib/md/pause");

const { PropTypes } = React;

import "./Transport.scss";

export interface ITransportProps {
  iconSize: number;
  showPlay?: boolean;
  showPause?: boolean;
  onPlay?: Function;
  onBack: Function;
  onForward: Function;
  onSkipToStart: Function;
  onSkipToEnd: Function;
}

export interface ITransportState {
}

class Transport extends React.Component<ITransportProps, ITransportState> {

  public static propTypes = {
    showPlay: PropTypes.bool,
    showPause: PropTypes.bool,
    iconSize: PropTypes.number.isRequired,
    onSkipToStart: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onForward: PropTypes.func.isRequired,
    onSkipToEnd: PropTypes.func.isRequired,
    onPlay: PropTypes.func,
  };

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

  @keydown("shift+left")
  skiptoStart() {
    this.props.onSkipToStart();
  }

  @keydown("shift+right")
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
      <div className="history-transport-panel" onKeyPress={handleKeyPress} tabIndex={0}>
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
export default Transport;
