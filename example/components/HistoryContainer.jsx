const log = require('debug')('dag-history-component:example:HistoryContainer');
import React, { PropTypes } from 'react';
import Promise from 'bluebird';
import { connect } from 'react-redux';
import History from '../../src/History';
require('../../src/daghistory.sass');

/* eslint-disable no-alert,no-console */
function saveHistory(history) {
  log('saving history to localstorage');
  try {
    window.localStorage.dagHistorySession = JSON.stringify(history);
    alert('History has been saved to localStorage');
  } catch (err) {
    console.log('Error Saving History to LocalStorage', err);
    alert('Error saving history to local storage, see console');
  }
}
/* eslint-enable no-alent,no-console */

function loadHistory() {
  log('loading history from localstorage');
  return Promise.resolve(JSON.parse(window.localStorage.dagHistorySession));
}

const HistoryContainer = ({ historyRoot }) => (
  <History
    showControlBar
    history={historyRoot}
    onSaveHistory={saveHistory}
    onLoadHistory={loadHistory}
  />
);
HistoryContainer.propTypes = {
  historyRoot: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ historyRoot: state });
export default connect(mapStateToProps)(HistoryContainer);
