import { 
  Span, 
  insertSpan, 
  initialSpans,
} from '../../spans';

const isNumber = d => !isNaN(d) && d !== null;
const convertArg = (arg, offset) => (arg !== null && arg !== undefined) ? arg - offset : arg;

export default function calculateSpans(
  type: string,
  max: number,
  startArg: number,
  endArg: number,
  branchStartArg: number,
  branchEndArg: number,
  activeIndexArg: number,
  successorIndexArg: number,
  pinnedIndexArg: number,
) {
  const offset = startArg;
  const start = startArg - offset;
  const end = endArg - offset;
  const branchStart = branchStartArg - offset;
  const branchEnd = branchEndArg - offset;
  const activeIndex = convertArg(activeIndexArg, offset);
  const successorIndex = convertArg(successorIndexArg, offset);
  const pinnedIndex = convertArg(pinnedIndexArg, offset);

  // Set up the initial spans ranges; culling out empty ranges
  let spans = initialSpans(start, max);
  const isCurrent = type === 'current';
  spans = insertSpan(spans, new Span(start, end + 1, 'UNRELATED_UNIQUE'));

  if (isNumber(branchStart) && isNumber(branchEnd) && branchStart >= 0 && branchEnd >= 0) {
    const color = isCurrent ? 'CURRENT' : 'ANCESTOR';
    const span = new Span(branchStart, branchEnd + 1, color);
    spans = insertSpan(spans, span);
  }

  if (isNumber(activeIndex) && activeIndex >= start && activeIndex <= max) {
    let color = type === 'current' ? 'CURRENT_ACTIVE' : 'LEGACY_ACTIVE';
    if (isNumber(pinnedIndex) && activeIndex === pinnedIndex + 1) {
      color = 'SUCCESSOR_ACTIVE';
    }
    const span = new Span(activeIndex, activeIndex + 1, color);
    spans = insertSpan(spans, span);
  }
  if (isNumber(pinnedIndex) && pinnedIndex >= 0) {
    const span = new Span(pinnedIndex, pinnedIndex + 1, 'SUCCESSOR_PIN');
    spans = insertSpan(spans, span);
  }
  if (isNumber(successorIndex) && successorIndex >= 0) {
    const color = isCurrent ? 'SUCCESSOR_ACTIVE' : 'SUCCESSOR';
    const span = new Span(successorIndex, successorIndex + 1, color);
    spans = insertSpan(spans, span);
  }
  return spans;
}
