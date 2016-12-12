export function determineCommitPathLength(pathLength: number, numLeadInStates: number) {
  return numLeadInStates === undefined ?
    pathLength :
    Math.min(numLeadInStates + 1, pathLength);
}

export function determineHighlight(
  selectedDepth: number,
  pathLength: number,
  numLeadInStates: number,
  active: boolean,
): number {
  const commitPathLength = determineCommitPathLength(pathLength, numLeadInStates);

  let result: number;

  if (selectedDepth === undefined && active) {
    // the depth has not been indicated, so we are selecting the final state of the current bookmark
    result = commitPathLength - 1;
  } else if (selectedDepth !== undefined) {
    if (numLeadInStates === undefined) {
      // No lead-in configured, we can use the raw depth value without alteration
      return selectedDepth;
    }

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
  }

  return result;
}
