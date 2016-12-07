import DagGraph from 'redux-dag-history/lib/DagGraph';

export const makeActions = (
  rawSelectedBookmark: number,
  rawSelectedBookmarkDepth: number,
  history: any,
  onSelectBookmarkDepth,
) => {
  const graph = new DagGraph(history.graph);
  const { bookmarks } = history;
  const { currentStateId } = graph;
  const currentBookmarkIndex = rawSelectedBookmark !== undefined ? rawSelectedBookmark : bookmarks.findIndex(it => it.stateId === currentStateId);
  const currentBookmark = currentBookmarkIndex !== undefined && bookmarks[currentBookmarkIndex];
  const pathAt = (index) => {
    if (index === undefined || index < 0 || index > bookmarks.length) {
      return [];
    }
    const bookmark = bookmarks[index];
    return graph.shortestCommitPath(bookmark.stateId);
  }
  const currentPath = pathAt(currentBookmarkIndex);
  const currentDepth = rawSelectedBookmarkDepth !== undefined ? rawSelectedBookmarkDepth : currentPath.length - 1;

  const handleStepBack = () => {
    // We're at the start of the presentation, do nothing
    const isAtBookmarkStart = currentDepth === 0;
    const isAtBeginning = currentBookmarkIndex === 0 && isAtBookmarkStart;

    if (currentBookmarkIndex === undefined || isAtBeginning) {
      return;
    } else if (isAtBookmarkStart) {
      const bookmarkIndex = currentBookmarkIndex - 1;
      const path = pathAt(bookmarkIndex);

      onSelectBookmarkDepth({
        bookmarkIndex,
        depth: undefined,
        state: path[path.length - 1],
      });
    } else {
      const depth = currentDepth - 1;
      const state = currentPath[depth];
      onSelectBookmarkDepth({
        bookmarkIndex: currentBookmarkIndex,
        depth,
        state,
      });
    }
  };

  const handleStepForward = () => {
    const isAtBookmarkEnd = currentDepth === currentPath.length - 1;
    const isAtLastBookmark = currentBookmarkIndex === bookmarks.length - 1;
    const isAtEnd = isAtLastBookmark && isAtBookmarkEnd;

    // We're at the end of the presentation, do nothing
    if (currentBookmarkIndex === undefined || isAtEnd) {
      return;
    } else if (isAtBookmarkEnd) {
      const bookmarkIndex = currentBookmarkIndex + 1;
      const path = pathAt(bookmarkIndex);
      onSelectBookmarkDepth({
        bookmarkIndex,
        depth: 0,
        state: path[0],
      });
    } else {
      const depth = currentDepth + 1;
      onSelectBookmarkDepth({
        bookmarkIndex: currentBookmarkIndex,
        depth,
        state: currentPath[depth],
      });
    }
  };

  const handleJumpToBookmark = (bookmarkIndex: number) => {
    const path = pathAt(bookmarkIndex);
    onSelectBookmarkDepth({
      bookmarkIndex,
      depth: undefined,
      state: path[path.length - 1],
    });
  };

  const handlePreviousBookmark = () => {
    const bookmarkIndex = Math.max(currentBookmarkIndex - 1, 0);
    handleJumpToBookmark(bookmarkIndex);
  };

  const handleNextBookmark = () => {
    const bookmarkIndex = Math.min(currentBookmarkIndex + 1, bookmarks.length - 1);
    handleJumpToBookmark(bookmarkIndex);
  };

  const handleSkipToStart = () => {
    handleJumpToBookmark(0);
  };

  const handleSkipToEnd = () => {
    handleJumpToBookmark(bookmarks.length - 1);
  };

  return {
    handleStepBack,
    handleStepForward,
    handleNextBookmark,
    handlePreviousBookmark,
    handleSkipToStart,
    handleSkipToEnd,
  };
}
