import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DagHistoryActions from 'redux-dag-history/lib/ActionCreators';
import * as DagComponentActions from '../../../actions';
import ExpandCollapseToggle from '../../ExpandCollapseToggle';
import Transport from '../../Transport';
import StateListContainer, { IStateListContainerProps } from './StateListContainer';
import BranchListContainer, { IBranchListContainerProps } from './BranchListContainer';
import { IHistoryContainerSharedProps } from "../interfaces";

const { PropTypes } = React;

export interface IBranchedHistoryViewStateProps {
}

export interface IBranchedHistoryViewDispatchProps {
  onStateSelect: (id: number) => void;
  onAddBookmark: Function;
  onBranchSelect: (id: number) => void;
  onRemoveBookmark: Function;
  onToggleBranchContainer: Function;
  onHighlightSuccessors: Function;
  onUndo: Function;
  onRedo: Function;
  onSkipToStart: Function;
  onSkipToEnd: Function;
  onRenameBranch: Function;
}

export interface IBranchedHistoryViewOwnProps extends IHistoryContainerSharedProps {
  bindTransportKeysGlobally?: boolean;
}

export interface IBranchedHistoryViewProps extends
  IBranchedHistoryViewStateProps,
  IBranchedHistoryViewDispatchProps,
  IBranchedHistoryViewOwnProps {
}

const BranchedHistoryView: React.StatelessComponent<IBranchedHistoryViewProps> = (props) => {
  const {
    branchContainerExpanded,
    onToggleBranchContainer,
    onUndo,
    onRedo,
    onSkipToStart,
    onSkipToEnd,
    bindTransportKeysGlobally,
  } = props;
  const branchList = branchContainerExpanded ?
    <BranchListContainer {...props} /> :
    <div />;

  return (
    <div className="history-container"style={{ flex: 1 }}>
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
        bindTransportKeysGlobally={bindTransportKeysGlobally}
        iconSize={30}
        onSkipToStart={onSkipToStart}
        onStepBack={onUndo}
        onStepForward={onRedo}
        onBack={onRedo}
        onForward={onUndo}
        onSkipToEnd={onSkipToEnd}
      />
    </div>
  );
};

BranchedHistoryView.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired,
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
  bindTransportKeysGlobally: PropTypes.bool,
};
export default connect<IBranchedHistoryViewStateProps, IBranchedHistoryViewDispatchProps, IBranchedHistoryViewOwnProps>(
  () => ({}),
  dispatch => bindActionCreators({
    onStateSelect: DagHistoryActions.jumpToState,
    onAddBookmark: DagHistoryActions.addBookmark,
    onBranchSelect: DagHistoryActions.jumpToBranch,
    onRemoveBookmark: DagHistoryActions.removeBookmark,
    onToggleBranchContainer: DagComponentActions.toggleBranchContainer,
    onHighlightSuccessors: DagHistoryActions.pinState,
    onUndo: DagHistoryActions.undo,
    onRedo: DagHistoryActions.redo,
    onSkipToStart: DagHistoryActions.skipToStart,
    onSkipToEnd: DagHistoryActions.skipToEnd,
    onRenameBranch: DagHistoryActions.renameBranch,
  }, dispatch)
)(BranchedHistoryView);
