import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Continuation from '../../../src/components/Continuation';

storiesOf('Continuation', module)
.add('Huge Number', () => (
  <Continuation numContinuations={980709870987} />
))
.add('Selected Empty', () => (
  <Continuation color="orange" numContinuations={undefined} />
))
.add('Selected with Number', () => (
  <Continuation numContinuations={12} color="orange" />
))
.add('Single Digit', () => (
  <Continuation numContinuations={3} color="orange" />
))
.add('Triple Digit', () => (
  <Continuation numContinuations={555} color="orange" />
))
.add('Unselected and Empty', () => (
  <Continuation />
))
.add('Unselected with Number', () => (
  <Continuation numContinuations={12} />
));
