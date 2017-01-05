import * as React from "react";
import './PlaybackPane.scss';

const { PropTypes } = React;
import StatePager from '../StatePager';

export interface IPlaybackPaneProps {
  text: string;
  depth: number;
  highlight: number;
  bookmarkDepth: number;
  bookmarkHighlight: number;
}

const PlaybackPane: React.StatelessComponent<IPlaybackPaneProps> = ({
  text,
  depth,
  highlight,
  bookmarkDepth,
  bookmarkHighlight,
}) => (
  <div className="playback-pane-container">
    <div className="playback-pane-paged">
      <div className="playback-pane">
        <h3>{text}</h3>
      </div>
      <StatePager vertical active depth={depth} highlight={highlight} />
    </div>
    <StatePager active depth={bookmarkDepth} highlight={bookmarkHighlight} />
  </div>
);

PlaybackPane.propTypes = {
  text: PropTypes.string.isRequired,

  // Props for the slide show
  depth: PropTypes.number.isRequired,
  highlight: PropTypes.number.isRequired,

  // Props for the current bookmark
  bookmarkDepth: PropTypes.number.isRequired,
  bookmarkHighlight: PropTypes.number.isRequired,
};

export default PlaybackPane;
