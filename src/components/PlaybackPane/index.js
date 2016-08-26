import React, { PropTypes } from 'react';
import './PlaybackPane.scss';

const PlaybackPane = ({ text }) => (
  <div className="playback-pane">
    <h3>{text}</h3>
  </div>
);
PlaybackPane.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PlaybackPane;
