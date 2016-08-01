import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import History from '../../src/components/History';
import { save, load } from '../persister';

require('../../src/daghistory.sass');

const HistoryContainer = ({
  historyRoot,
  mainView,
  branchContainerExpanded,
  highlightSuccessorsOf,
}) => (
  <div className="history-viz-container">
    <History
      history={historyRoot}
      mainView={mainView}
      branchContainerExpanded={branchContainerExpanded}
      highlightSuccessorsOf={highlightSuccessorsOf}
      controlBar={{
        onSaveHistory: save,
        onLoadHistory: load,
      }}
      bookmarksEnabled
    />
    <input id="pickFileInput" type="file" name="pickFileInput" style={{ display: 'none' }} />
  </div>
);
HistoryContainer.propTypes = {
  historyRoot: PropTypes.object,
  mainView: PropTypes.string,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,
};

const mapStateToProps = state => ({
  historyRoot: state.app,
  mainView: state.history.mainView,
  branchContainerExpanded: state.history.branchContainerExpanded,
  highlightSuccessorsOf: state.history.highlightSuccessorsOf,
});
export default connect(mapStateToProps)(HistoryContainer);
