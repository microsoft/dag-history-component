// TODO: This file is legacy. Think about what to do with it.
const log = require('debug')('dag-history-component:components:History');
import DagGraph from 'redux-dag-history/lib/DagGraph';
import React, { PropTypes } from 'react';
import StateList from '../StateList';
// import BranchList from '../BranchList';

require('./History.sass');

const History = ({ history }) => {
  const historyGraph = new DagGraph(history.graph);

  const { currentBranch, currentStateId } = historyGraph;
  const latestCommitOnBranch = historyGraph.latestOn(currentBranch);
  const commitPath = historyGraph.commitPath(latestCommitOnBranch);

  log('render history',
    currentBranch,
    currentStateId,
    history,
    commitPath,
    commitPath.map(c => historyGraph.stateName(c))
  );

  const states = commitPath.reverse().map(id => ({
    id,
    label: historyGraph.stateName(id),
    branchType: 'current', // TODO: figure out how to distinguish between current/legacy,
    continuation: ({
      numContinuations: historyGraph.childrenOf(id).length,
      isSelected: id === currentStateId,
    }),
  }));

  const onStateClick = (id) => log('state clicked!', id);
  const onStateContinuationClick = (id) => log('state continuation clicked!', id);

  return (
    <div className="history-container">
      <div className="state-list-container">
        <StateList
          activeStateId={currentStateId}
          states={states}
          onStateClick={onStateClick}
          onStateContinuationClick={onStateContinuationClick}
        />
      </div>
    </div>
  );
};

History.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired,
};

/*
activeStateId: PropTypes.string.isRequired,
states: PropTypes.arrayOf(React.PropTypes.shape({
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
})),
onStateClick: PropTypes.func,
onStateContinuationClick: PropTypes.func,
*/

export default History;
