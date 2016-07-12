import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import History from '../../src/History';
require('../../src/daghistory.sass');

const HistoryContainer = ({ historyRoot }) => (
  <History
    showControlBar
    history={historyRoot}
  />
);
HistoryContainer.propTypes = {
  historyRoot: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ historyRoot: state });
export default connect(mapStateToProps)(HistoryContainer);
