import * as React from 'react';
import { connect } from 'react-redux';
import { save, load } from '../persister';
import '../../src/daghistory.scss';

import HistoryComponent from '../../src/components/History';

const { PropTypes } = React;

interface IHistoryContainerStateProps {
  history: any,
  mainView: string;
  historyType: string;
  branchContainerExpanded?: boolean;
  highlightSuccessorsOf?: number;
  selectedBookmark?: number;
  selectedBookmarkDepth?: number;
}
interface IHistoryContainerProps extends IHistoryContainerStateProps {
}

const HistoryContainer: React.StatelessComponent<IHistoryContainerProps> = (props) => {
  return (
    <div className='history-viz-container'>
      <HistoryComponent
        {...props}
        bookmarksEnabled
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
      />
      <input id='pickFileInput' type='file' name='pickFileInput' style={{ display: 'none' }} />
    </div>
  );
};

HistoryContainer.propTypes = {
  history: PropTypes.object,
  mainView: PropTypes.string,
  historyType: PropTypes.string,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,
  selectedBookmark: PropTypes.number,
};

const mapStateToProps = state => ({
  history: state.app,
  mainView: state.history.mainView,
  historyType: state.history.historyType,
  branchContainerExpanded: state.history.branchContainerExpanded,
  highlightSuccessorsOf: state.app.pinnedStateId,
  selectedBookmark: state.history.selectedBookmark,
  selectedBookmarkDepth: state.history.selectedBookmarkDepth,
  isPlayingBack: state.history.isPlayingBack,
});
export default connect<IHistoryContainerStateProps, {}, {}>(mapStateToProps)(HistoryContainer);
