export function determineCommitPathLength(pathLength: number, numLeadInStates: number) {
  return numLeadInStates === undefined ?
    pathLength :
    Math.min(numLeadInStates + 1, pathLength);
}

export function determineHighlight(
  selectedDepth: number,
  pathLength: number,
  numLeadInStates: number,
): number {
  const commitPathLength = determineCommitPathLength(pathLength, numLeadInStates);
  if (selectedDepth === undefined) {
    // the depth has not been indicated, so we are selecting the final state of the current bookmark
    return commitPathLength - 1;
  } else if (numLeadInStates === undefined) {
    // No lead-in set, highlight the whole band
    return 0;
  }
  let result: number;
  // Figure out how many states are skipped at the beginning
  const culledPrefix = pathLength - (numLeadInStates + 1);
  if (culledPrefix < 0) {
    // If the number of cullest states doesn't make sense, just return the raw selected depth
    result = selectedDepth;
  } else {
    // Adjust the depth according to the number of culled states
    const adjustedDepthIndex = selectedDepth - culledPrefix;
    if (adjustedDepthIndex >= 0) {
      result = adjustedDepthIndex;
    }
  }
  return result;
}
