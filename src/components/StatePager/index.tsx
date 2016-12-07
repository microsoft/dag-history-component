import * as React from 'react';
import './StatePager.scss';
import * as classnames from 'classnames';

export interface IStatePagerProps {
  /**
   * If true, renders in vertical mode
   */
  vertical?: boolean;

  /**
   * The highlighted index
   */
  highlight?:  number;

  /**
   * The number of states in the pager
   */
  depth: number;
}

const StatePager: React.StatelessComponent<IStatePagerProps> = ({
  vertical,
  depth,
  highlight,
}) => {
  const pagerClass = classnames(
    'state-pager',
    { vertical },
    { horizontal: !vertical },
  );

  const postFlex = (depth - 1) - (highlight || 0);
  const preFlex = (depth - 1) - postFlex;
  const highlighted = highlight !== undefined ?
    (<div className="pager-state highlighted" style={{ flex: 1 }} />) :
    null;
  return (
    <div className={pagerClass}>
      <div className="pager-state" style={{ flex: preFlex }} />
      { highlighted }
      <div className="pager-state" style={{ flex: postFlex }} />
    </div>
  );
};

StatePager.propTypes = {
  vertical: React.PropTypes.bool,
  depth: React.PropTypes.number.isRequired,
  highlight: React.PropTypes.number,
};
StatePager.defaultProps = {
  vertical: false,
  depth: 0,
  highlight: undefined,
};

export default StatePager;
