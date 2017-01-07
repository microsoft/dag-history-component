import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import StatePager from '../../../src/components/StatePager';

storiesOf('StatePager', module)
.add('Horizontal', () => (
  <StatePager depth={10} highlight={8} />
))
.add('Horizontal, Full-Width', () => (
  <StatePager depth={0} highlight={0} />
))
.add('Vertical', () => (
  <div style={{height: 300, display: 'flex'}}>
    <StatePager vertical depth={10} highlight={8} />
    <div style={{flex: 2}} />
  </div>
));
