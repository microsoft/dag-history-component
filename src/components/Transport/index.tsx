import * as React from "react";
const { default: keydown, Keys } = require("react-keydown");
const MdKeyboardArrowLeft = require("react-icons/lib/md/keyboard-arrow-left");
const MdKeyboardArrowRight = require("react-icons/lib/md/keyboard-arrow-right");
const MdSkipNext = require("react-icons/lib/md/skip-next");
const MdSkipPrevious = require("react-icons/lib/md/skip-previous");
const MdPlayArrow = require("react-icons/lib/md/play-arrow");
const MdPause = require("react-icons/lib/md/pause");

const { PropTypes } = React;
const DEFAULT_ICON_SIZE = 30;

import "./Transport.scss";

export interface ITransportProps {
  iconSize?: number;
  playing?: boolean;
  onPlay?: Function;
  onStop?: Function;
  onBack?: Function;
  onForward?: Function;
  onSkipToStart?: Function;
  onSkipToEnd?: Function;
}

export interface ITransportState {
}

class Transport extends React.Component<ITransportProps, ITransportState> {

  public static propTypes = {
    playing: PropTypes.bool,
    iconSize: PropTypes.number,
    onSkipToStart: PropTypes.func,
    onBack: PropTypes.func,
    onForward: PropTypes.func,
    onSkipToEnd: PropTypes.func,
    onStop: PropTypes.func,
    onPlay: PropTypes.func,
  };

  public static defaultProps = {
    iconSize: DEFAULT_ICON_SIZE,
    playing: false,
  };

  @keydown(Keys.SPACE)
  play() {
    if (this.props.onPlay) {
      this.props.onPlay();
    }
  }

  @keydown(Keys.ESC)
  stop() {
    if (this.props.onStop) {
      this.props.onStop();
    }
  }

  @keydown(Keys.LEFT)
  back() {
    if (this.props.onBack) {
      this.props.onBack();
    }
  }

  @keydown(Keys.RIGHT)
  forward() {
    if (this.props.onForward) {
      this.props.onForward();
    }
  }

  @keydown("shift+left")
  skipToStart() {
    if (this.props.onSkipToStart) {
      this.props.onSkipToStart();
    }
  }

  @keydown("shift+right")
  skipToEnd() {
    if (this.props.onSkipToEnd) {
      this.props.onSkipToEnd();
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
      onStop,
      playing,
    } = this.props;

    const playPauseButton = playing ?
      (<MdPause size={iconSize} onClick={() => this.stop()} />) :
      (<MdPlayArrow size={iconSize} onClick={() => this.play()} />)

    return (
      <div
        className="history-transport-panel"
        tabIndex={0}
        onKeyDown={() => {}} // allows event bubbling
      >
        <MdSkipPrevious size={iconSize} onClick={() => this.skipToStart()} />
        <MdKeyboardArrowLeft size={iconSize} onClick={() => this.back()} />
        {playPauseButton}
        <MdKeyboardArrowRight size={iconSize} onClick={() => this.forward()} />
        <MdSkipNext size={iconSize} onClick={() => this.skipToEnd()} />
      </div>
    );
  }
}
export default Transport;
