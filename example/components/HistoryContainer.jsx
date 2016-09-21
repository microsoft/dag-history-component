import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { save, load } from '../persister';
import '../../src/daghistory.scss';

import HistoryComponent from '../../src/components/History';

const HistoryContainer = ({
  historyRoot,
  mainView,
  branchContainerExpanded,
  highlightSuccessorsOf,
}) => (
  <div className="history-viz-container">
    <HistoryComponent
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
  historyRoot: PropTypes.object, // eslint-disable-line
  mainView: PropTypes.string,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,
};

const mapStateToProps = state => ({
  historyRoot: state.app,
  mainView: state.history.mainView,
  branchContainerExpanded: state.history.branchContainerExpanded,
  highlightSuccessorsOf: state.app.pinnedStateId,
});
export default connect(mapStateToProps)(HistoryContainer);
