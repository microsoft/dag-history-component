import * as React from 'react';
import State from './State';
import { IStateWithSuccessorsProps } from './interfaces';

const StateWithSuccessors: React.StatelessComponent<IStateWithSuccessorsProps> = (props) => {
  const children = props.childStates.map(child => {
    return (
      <li>
        <State {...child} />
      </li>
    );
  });
  return (
    <div>
      <State {...props} />
      <ul className="successor-state-container">
        {children}
      </ul>
    </div>
  )
};

export default StateWithSuccessors;
