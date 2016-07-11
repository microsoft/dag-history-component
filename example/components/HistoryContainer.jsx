import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    jumpToBranch,
    jumpToState,
    clear,
    squash,
    createBranch,
} from "../state/Actions";
import History from "../../src/History";
require("../../src/daghistory.sass");

class HistoryContainer extends React.Component<IDocumentViewerProps, IDocumentViewerState> {
    /**
     * Renders this component
     */
    render() {
        const {
            historyRoot,
            actions: {
                jumpToBranch,
                jumpToState,
            },
        } = this.props;
        return (
            <History
                history={historyRoot}
                onBranchSelect={jumpToBranch}
                onStateSelect={jumpToState}
            />
        );
    }
}

const mapStateToProps = state => ({
  graph: state.graph,
  present: state.current,
  historyRoot: state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
      jumpToBranch,
      jumpToState,
      clear,
      squash,
      createBranch,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
