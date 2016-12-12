import * as React from "react";
const { default: keydown, Keys } = require("react-keydown");
const MdKeyboardArrowLeft = require("react-icons/lib/md/keyboard-arrow-left");
const MdKeyboardArrowRight = require("react-icons/lib/md/keyboard-arrow-right");
const MdSkipNext = require("react-icons/lib/md/skip-next");
const MdSkipPrevious = require("react-icons/lib/md/skip-previous");
const MdPlayArrow = require("react-icons/lib/md/play-arrow");
const MdPause = require("react-icons/lib/md/pause");
import { debounce } from "lodash";

const { PropTypes } = React;
const DEFAULT_ICON_SIZE = 30;
const KEY_DEBOUNCE_INTERVAL = 50;

import "./Transport.scss";

export interface ITransportCallbackProps {
  onPlay?: Function;
  onStop?: Function;
  onBack?: Function;
  onForward?: Function;
  onSkipToStart?: Function;
  onSkipToEnd?: Function;
  onStepForward?: Function;
  onStepBack?: Function;
}

export interface ITransportProps extends ITransportCallbackProps {
  iconSize?: number;
  playing?: boolean;
  showPlay?: boolean;
  bindTransportKeysGlobally?: boolean;
}

export interface ITransportState {
}

const keys = {
  SPACE: 32,
  ESC: 27,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};

class Transport extends React.Component<ITransportProps, ITransportState> {

  public static propTypes = {
    playing: PropTypes.bool,
    showPlay: PropTypes.bool,
    iconSize: PropTypes.number,
    onSkipToStart: PropTypes.func,
    onBack: PropTypes.func,
    onForward: PropTypes.func,
    onSkipToEnd: PropTypes.func,
    onStop: PropTypes.func,
    onPlay: PropTypes.func,
    onStepForward: PropTypes.func,
    onStepBack: PropTypes.func,
    bindTransportKeysGlobally: PropTypes.bool,
  };

  public static defaultProps = {
    iconSize: DEFAULT_ICON_SIZE,
    playing: false,
    showPlay: true,
  };

  private oldKeydownHandler = null;
  private handlers: ITransportCallbackProps = null;

  public componentDidMount() {
    if (this.props.bindTransportKeysGlobally) {
      this.oldKeydownHandler = document.onkeydown;
      document.onkeydown = this.handleKeydown.bind(this);
    }
  }

  public componentWillUnmount() {
    if (this.props.bindTransportKeysGlobally) {
      document.onkeydown = this.oldKeydownHandler;
    }
  }

  @keydown(Keys.SPACE)
  play() {
    if (this.handlers.onPlay) {
      this.handlers.onPlay();
    }
  }

  @keydown(Keys.LEFT)
  stepBack() {
    if (this.handlers.onStepBack) {
      this.handlers.onStepBack();
    }
  }

  @keydown(Keys.RIGHT)
  stepForward() {
    if (this.handlers.onStepForward) {
      this.handlers.onStepForward();
    }
  }

  @keydown(Keys.ESC)
  stop() {
    if (this.handlers.onStop) {
      this.handlers.onStop();
    }
  }

  @keydown(Keys.UP)
  back() {
    if (this.handlers.onBack) {
      this.handlers.onBack();
    }
  }

  @keydown(Keys.DOWN)
  forward() {
    if (this.handlers.onForward) {
      this.handlers.onForward();
    }
  }

  @keydown("shift+up")
  skipToStart() {
    if (this.handlers.onSkipToStart) {
      this.handlers.onSkipToStart();
    }
  }

  @keydown("shift+down")
  skipToEnd() {
    if (this.handlers.onSkipToEnd) {
      this.handlers.onSkipToEnd();
    }
  }

  public render() {
    const debounced = (target: Function) => target ? debounce(target, KEY_DEBOUNCE_INTERVAL) : target;
    const {
      iconSize,
      playing,
      showPlay,
    } = this.props;

    this.handlers = {
      onPlay: debounced(this.props.onPlay),
      onStop: debounced(this.props.onStop),
      onBack: debounced(this.props.onBack),
      onForward: debounced(this.props.onForward),
      onSkipToStart: debounced(this.props.onSkipToStart),
      onSkipToEnd: debounced(this.props.onSkipToEnd),
      onStepForward: debounced(this.props.onStepForward),
      onStepBack: debounced(this.props.onStepBack),
    };

    let playPauseButton = <div />;
    if (showPlay) {
      playPauseButton = playing ?
        (<MdPause size={iconSize} onClick={() => this.stop()} />) :
        (<MdPlayArrow size={iconSize} onClick={() => this.play()} />)
    }

    return (
      <div
        className="history-transport-panel"
        tabIndex={0}
        onKeyPress={() => {}} // allows event bubbling
      >
        <MdSkipPrevious size={iconSize} onClick={() => this.skipToStart()} />
        <MdKeyboardArrowLeft size={iconSize} onClick={() => this.back()} />
        {playPauseButton}
        <MdKeyboardArrowRight size={iconSize} onClick={() => this.forward()} />
        <MdSkipNext size={iconSize} onClick={() => this.skipToEnd()} />
      </div>
    );
  }

  private handleKeydown(arg: KeyboardEvent) {
    const { keyCode } = arg;
    if (keyCode === keys.SPACE) { // space
      this.play();
    } else if (keyCode === keys.ESC) {
      this.stop();
    } else if (keyCode === keys.UP) {
      if (arg.shiftKey) {
        this.skipToStart();
      } else {
        this.back();
      }
    } else if (keyCode === keys.DOWN) {
      if (arg.shiftKey) {
        this.skipToEnd();
      } else {
        this.forward();
      }

    } else if (keyCode === keys.LEFT) {
      this.stepBack();
    } else if (keyCode === keys.RIGHT) {
      this.stepForward();
    }
  }
}
export default Transport;
