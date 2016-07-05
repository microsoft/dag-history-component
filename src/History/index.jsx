// TODO: This file is legacy. Think about what to do with it.
const log = require('debug')('dag-history-component:components:History');
import * as React from 'react';
require('./History.sass');

const History = () => {
  log('render history', this.props);
  return (
    <div>
      <h1>History!!!</h1>
    </div>
  );
};

History.propTypes = {
  present: React.PropTypes.object,
  actions: React.PropTypes.object,
  future: React.PropTypes.array,
  past: React.PropTypes.array,
  branch: React.PropTypes.string,
  availableBranches: React.PropTypes.array,
  currentStateId: React.PropTypes.string,
};

export default History;
