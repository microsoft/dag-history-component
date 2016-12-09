import { IDagHistory } from 'redux-dag-history/lib/interfaces';

export interface IHistoryContainerSharedProps {
  history: IDagHistory<any>;
  mainView: string;
  historyType: string;
  getSourceFromState: Function;
  branchContainerExpanded?: boolean;
  highlightSuccessorsOf?: number;
  bookmarksEnabled?: boolean;
  bindTransportKeysGlobally?: boolean;

  /**
   * ControlBar Configuration Properties
   */
  controlBar: {
    /**
     * A handler to save the history tree out. This is handled by clients.
     */
    onSaveHistory: Function;

    /**
     * A handler to retrieve the history tree. This is handled by clients
     */
    onLoadHistory: Function;

    /**
     * A function that emits a Promise<boolean> that confirms the clear-history operation.
     */
    onConfirmClear: Function;
  };
}
