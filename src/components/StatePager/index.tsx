import * as React from 'react';
import * as classnames from 'classnames';
import calculateSpans from './calculateSpans';
import './StatePager.scss';

const log = require('debug')('dag-history-component:components:StatePager');

export interface IStatePagerProps {
  /**
   * If true, renders in vertical mode
   */
  vertical?: boolean;

  /**
   * If true, then the path this state pager represents is currently active
   */
  active?: boolean;

  /**
   * The highlighted index
   */
  highlight?:  number;

  /**
   * The number of states in the pager
   */
  depth: number;

  /**
   * The number of lead-in states to show
   */
  leadIn?: number;
}

const StatePager: React.StatelessComponent<IStatePagerProps> = ({
  vertical,
  depth,
  highlight,
  leadIn,
  active,
}) => {
  const spans = calculateSpans(depth, highlight, leadIn, active);
  const pagerClass = classnames(
    'state-pager',
    { vertical },
    { horizontal: !vertical },
  );

  const spanTags = spans.map((s, index) => (
    <div
      key={`pagerSpan::${index}`}
      className={classnames("pager-state", s.type)}
      style={{flex: s.length}}
    />
  ));

  const handleClick = (evt: React.MouseEvent<any>) => {
    log('handling click', evt);
  }

  return (
    <div className={pagerClass} onClick={handleClick}>
      {spanTags}
    </div>
  );
};

StatePager.propTypes = {
  vertical: React.PropTypes.bool,
  active: React.PropTypes.bool,
  depth: React.PropTypes.number.isRequired,
  highlight: React.PropTypes.number,
  leadIn: React.PropTypes.number,
};
StatePager.defaultProps = {
  vertical: false,
  active: false,
  depth: 0,
  highlight: undefined,
  leadIn: undefined,
};

export default StatePager;
