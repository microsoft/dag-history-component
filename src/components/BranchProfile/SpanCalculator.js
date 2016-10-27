// const log = require('debug')('dag-history-component:SpanCalculator');

export class Span {
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
}

function spanContains(span, index) {
  return index >= span.start && index < span.end;
}

/**
 * Gets the initial set of common spans for a branch profile
 */
export function initialSpans(start, max, type = 'NONE') {
  return [new Span(start, max + 1, type)];
}

export function insertSpan(spans, newSpan) {
  let result = spans;
  // log('insert span', newSpan);

  // Find span to split
  let modified = false;
  for (let i = 0; i < spans.length; i += 1) {
    const span = spans[i];
    if (span.start === newSpan.start && span.end === newSpan.end) {
      return spans.slice(0, i).concat([newSpan]).concat(spans.slice(i + 1));
    }
    if (spanContains(span, newSpan.start)) {
      if (newSpan.end === span.end) {
        modified = true;
        result = spans.slice(0, i)
          .concat([
            new Span(span.start, newSpan.start, span.type),
            newSpan,
          ])
          .concat(spans.slice(i + 1))
          .filter(t => t.end > t.start);
        break;
      } else if (newSpan.end > span.end) {
        const nextSpan = spans[i + 1];
        // Split next span as well
        modified = true;
        result = spans.slice(0, i)
          .concat([
            new Span(span.start, newSpan.start, span.type),
            newSpan,
            new Span(newSpan.end, nextSpan.end, nextSpan.type),
          ])
          .concat(spans.slice(i + 2))
          .filter(t => t.end > t.start);
        break;
      } else {
        // Only split current span
        modified = true;
        result = spans.slice(0, i)
          .concat([
            new Span(span.start, newSpan.start, span.type),
            newSpan,
            new Span(newSpan.end, span.end, span.type),
          ])
          .concat(spans.slice(i + 1))
          .filter(t => t.end > t.start);
        break;
      }
    }
  }

  if (!modified) {
    throw new Error(`Could not insert span ${newSpan.toString()} into spanset [${spans.map(s => s.toString()).join(',')}]`); // eslint-disable-line
  }
  return result;
}


const isNumber = d => !isNaN(d) && d !== null;
const convertArg = (arg, offset) => (arg !== null && arg !== undefined) ? arg - offset : arg; // eslint-disable-line

export function getSpans(
  type,
  max,
  startArg,
  endArg,
  branchStartArg,
  branchEndArg,
  activeIndexArg,
  successorIndexArg,
  pinnedIndexArg
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
