import * as React from "react";
import './PlaybackPane.scss';

const { PropTypes } = React;

export interface IPlaybackPaneProps {
  text: string;
}

const PlaybackPane: React.StatelessComponent<IPlaybackPaneProps> = ({ text }) => (
  <div className="playback-pane">
    <h3>{text}</h3>
  </div>
);
PlaybackPane.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PlaybackPane;
