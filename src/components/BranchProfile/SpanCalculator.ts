// const log = require('debug')('dag-history-component:SpanCalculator');

export class Span {
  public start: number;
  public end: number;
  public type: string;

  constructor(start, end, type) {
    this.start = start;
    this.end = end;
    this.type = type;
  }

  toString() {
    return `Span::${this.type}[${this.start} => ${this.end}]`;
  }

  get length() {
    return this.end - this.start;
  }

  areBoundsEqual(other: Span) {
    return other.start === this.start && other.end === this.end;
  }

  contains(index) {
    return index >= this.start && index <= this.end;
  }
}

/**
 * Gets the initial set of common spans for a branch profile
 */
export function initialSpans(start: number, max: number, type = 'NONE') {
  return [new Span(start, max + 1, type)];
}

/**
 * Replaces a span at at index with the given span
 */
function replaceSpan(spans: Span[], newSpan: Span, i: number) {
  return spans.slice(0, i)
    .concat([newSpan])
    .concat(spans.slice(i + 1));
}

/**
 * Inserts a span at the tail of an existing span
 * [=============] <-- existing
 *          [++++] <-- new
 * becomes
 *
 * [=======][++++] <-- pruned existing + new
 */
function insertSpanAtTail(spans: Span[], newSpan: Span, i: number) {
  const span = spans[i];
  return spans.slice(0, i)
    .concat([
      new Span(span.start, newSpan.start, span.type),
      newSpan,
    ])
    .concat(spans.slice(i + 1))
    .filter(t => t.end > t.start);
}

/**
 * Inserts a span at the bridge-point between two spans
 * [aaaaaaaaaaaaaaa][bbbbbbbbbbbbbb] <-- existing
 *              [cccccc]             <-- new
 *  becomes
 *
 * [aaaaaaaaaaaa[cccccc][bbbbbbbbbb]
 */
function insertBridgingSpan(spans: Span[], newSpan: Span, i: number) {
  const left = spans[i];
  const right = spans[i + 1];

  return spans.slice(0, i)
    .concat([
      new Span(left.start, newSpan.start, left.type),
      newSpan,
      new Span(newSpan.end, right.end, right.type),
    ])
    .concat(spans.slice(i + 2))
    .filter(t => t.end > t.start);
}

/**
 * Inserts a span interior to an existing span
 * [aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa] <-- existing
 *              [cccccc]              <-- new
 *  becomes
 *
 * [aaaaaaaaaaaa[cccccc][aaaaaaaaaaa]
 */
function insertSplittingSpan(spans: Span[], newSpan: Span, i: number) {
  const span = spans[i];
  return spans.slice(0, i)
    .concat([
      new Span(span.start, newSpan.start, span.type),
      newSpan,
      new Span(newSpan.end, span.end, span.type),
    ])
    .concat(spans.slice(i + 1))
    .filter(t => t.end > t.start);
}

export function insertSpan(spans: Span[], newSpan: Span) {
  for (let i = 0; i < spans.length; i += 1) {
    const span = spans[i];
    if (span.areBoundsEqual(newSpan)) {
      return replaceSpan(spans, newSpan, i);
    }
    if (span.contains(newSpan.start)) {
      if (newSpan.end === span.end) {
        return insertSpanAtTail(spans, newSpan, i);
      } else if (newSpan.end > span.end) {
        return insertBridgingSpan(spans, newSpan, i);
      }
      return insertSplittingSpan(spans, newSpan, i);
    }
  }

  throw new Error(`Could not insert span ${newSpan} into spanset [${spans.map(s => s.toString()).join(',')}]`);
}


const isNumber = d => !isNaN(d) && d !== null;
const convertArg = (arg, offset) => (arg !== null && arg !== undefined) ? arg - offset : arg;

export function getSpans(
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
