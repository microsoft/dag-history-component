import * as React from 'react';
import { connect } from 'react-redux';
import { save, load } from '../persister';
import '../../src/daghistory.scss';

import HistoryComponent from '../../src/components/History';

const { PropTypes } = React;

interface IHistoryContainerStateProps {
  historyRoot: any,
  mainView: string;
  historyType: string;
  branchContainerExpanded?: boolean;
  highlightSuccessorsOf?: number;
}
interface IHistoryContainerProps extends IHistoryContainerStateProps {
}

const HistoryContainer: React.StatelessComponent<IHistoryContainerProps> = ({
  historyRoot,
  mainView,
  historyType,
  branchContainerExpanded,
  highlightSuccessorsOf,
}) => (
  <div className='history-viz-container'>
    <HistoryComponent
      history={historyRoot}
      mainView={mainView}
      historyType={historyType}
      branchContainerExpanded={branchContainerExpanded}
      highlightSuccessorsOf={highlightSuccessorsOf}
      getSourceFromState={state => (
        state.toJS ?
        state.toJS().metadata.source :
        state.metadata.source
      )}
      controlBar={{
        onSaveHistory: save,
        onLoadHistory: load,
        onConfirmClear: () => Promise.resolve(true),
      }}
      bookmarksEnabled
    />
    <input id='pickFileInput' type='file' name='pickFileInput' style={{ display: 'none' }} />
  </div>
);
HistoryContainer.propTypes = {
  historyRoot: PropTypes.object,
  mainView: PropTypes.string,
  historyType: PropTypes.string,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,
};

const mapStateToProps = state => ({
  historyRoot: state.app,
  mainView: state.history.mainView,
  historyType: state.history.historyType,
  branchContainerExpanded: state.history.branchContainerExpanded,
  highlightSuccessorsOf: state.app.pinnedStateId,
});
export default connect<IHistoryContainerStateProps, {}, {}>(mapStateToProps)(HistoryContainer);
