import * as React from "react";
import './PlaybackPane.scss';

const { PropTypes } = React;
import StatePager from '../StatePager';
import { determineHighlight } from '../provenance';

const log = require('debug')('dag-history-component:components:PlaybackPane');

export interface IPlaybackPaneProps {
  text: string;
  depth: number;
  highlight: number;
  bookmarkDepth: number;
  bookmarkHighlight: number;
  bookmarkNumLeadInStates?: number;
}

const PlaybackPane: React.StatelessComponent<IPlaybackPaneProps> = (props) => {
  const {
    text,
    depth,
    highlight,
    bookmarkDepth,
    bookmarkHighlight,
    bookmarkNumLeadInStates,
  } = props;
  const leadIn = bookmarkNumLeadInStates || 0;
  const adjustedBookmarkHighlight = determineHighlight(bookmarkHighlight, bookmarkDepth, bookmarkNumLeadInStates);
  return (
    <div className="playback-pane-container">
      <div className="playback-pane-paged">
        <div className="playback-pane">
          <h3>{text}</h3>
        </div>
        <StatePager vertical active depth={depth - 1} highlight={highlight} />
      </div>
      <StatePager active depth={leadIn || 0} highlight={adjustedBookmarkHighlight} />
    </div>
  );
};

PlaybackPane.propTypes = {
  text: PropTypes.string.isRequired,

  // Props for the slide show
  depth: PropTypes.number.isRequired,
  highlight: PropTypes.number.isRequired,

  // Props for the current bookmark
  bookmarkDepth: PropTypes.number.isRequired,
  bookmarkHighlight: PropTypes.number.isRequired,
  bookmarkNumLeadInStates: PropTypes.number,
};

export default PlaybackPane;
