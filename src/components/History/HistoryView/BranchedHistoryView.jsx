import React, { PropTypes } from 'react';
import ExpandCollapseToggle from '../../ExpandCollapseToggle';
import Transport from '../../Transport';
import StateListContainer from './StateListContainer';
import BranchListContainer from './BranchListContainer';

const BranchedHistoryView = (props) => {
  const {
    branchContainerExpanded,
    onToggleBranchContainer,
    onUndo,
    onRedo,
    onSkipToStart,
    onSkipToEnd,
  } = props;
  const branchList = branchContainerExpanded ?
    <BranchListContainer {...props} /> :
    <div />;

  return (
    <div className="history-container">
      {<StateListContainer {...props} />}
      <div className="branch-list-container">
        <div className="history-control-bar">
          <div className="title">Paths</div>
          <ExpandCollapseToggle
            isExpanded={branchContainerExpanded}
            onClick={onToggleBranchContainer}
          />
        </div>
        {branchList}
      </div>
      <Transport
        iconSize={30}
        onSkipToStart={onSkipToStart}
        onBack={onUndo}
        onForward={onRedo}
        onSkipToEnd={onSkipToEnd}
      />
    </div>
  );
};

BranchedHistoryView.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired, // eslint-disable-line
  getSourceFromState: PropTypes.func.isRequired,
  branchContainerExpanded: PropTypes.bool,
  highlightSuccessorsOf: PropTypes.number,

  /**
   * User Interaction Handlers - loaded by redux
   */
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
export default BranchedHistoryView;
