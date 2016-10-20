import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BranchedIcon from 'react-icons/lib/go/git-branch';
import ChronologicalIcon from 'react-icons/lib/go/three-bars';
import { selectHistoryType } from '../../../actions';
import BranchedHistoryView from './BranchedHistoryView';
import ChronologicalHistoryView from './ChronologicalHistoryView';
import OptionDropdown from '../../OptionDropdown';

const viewLabels = {
  branched: 'Branched',
  chronological: 'Chronological',
};

const viewIcons = {
  branched: (<BranchedIcon size={20} />),
  chronological: (<ChronologicalIcon size={20} />),
};

const HistoryView = (props) => {
  const renderedHistory = props.historyType === 'chronological' ?
    <ChronologicalHistoryView style={{ flex: 1 }} {...props} /> :
    <BranchedHistoryView style={{ flex: 1 }} {...props} />;

  const historyTypeOption = name => ({
    label: viewLabels[name],
    element: (
      <div className="dropdown-option-row">
        <span>{viewLabels[name]}</span>
        {viewIcons[name]}
      </div>
    ),
    onClick: () => props.onSelectHistoryType(name),
  });
  const label = viewLabels[props.historyType];

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <OptionDropdown
          triggerClass="history-type-dropdown-trigger"
          label={label}
          icon={viewIcons[props.historyType]}
          options={[
            historyTypeOption('branched'),
            historyTypeOption('chronological'),
          ]}
        />
      </div>
      {renderedHistory}
    </div>
  );
};
HistoryView.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired, // eslint-disable-line
  mainView: PropTypes.string.isRequired,
  historyType: PropTypes.string.isRequired,
  getSourceFromState: PropTypes.func.isRequired,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,

  /**
   * User Interaction Handlers - loaded by redux
   */
  onSelectHistoryType: PropTypes.func,
  onBranchSelect: PropTypes.func,
  onStateSelect: PropTypes.func,
  onAddBookmark: PropTypes.func,
  onRemoveBookmark: PropTypes.func,
  onToggleBranchContainer: PropTypes.func,
  onHighlightSuccessors: PropTypes.func,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
  onSkipToStart: PropTypes.func,
  onSkipToEnd: PropTypes.func,
  onRenameBranch: PropTypes.func,

  /**
   * Bookbark Configuration Properties
   */
  bookmarksEnabled: PropTypes.bool,
};

export default connect(
  () => ({}),
  dispatch => bindActionCreators({
    onSelectHistoryType: selectHistoryType,
  }, dispatch),
)(HistoryView);
