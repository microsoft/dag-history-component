import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BranchProfile from '../../../src/components/BranchProfile';

storiesOf('BranchProfile', module)
.add('1/2 Selected', () => (
  <BranchProfile
    start={0}
    end={1}
    max={1}
    activeStateIndex={0}
    type="current"
  />
))
.add('2/2 Selected', () => (
  <BranchProfile
    start={0}
    end={1}
    max={1}
    activeStateIndex={1}
    type="current"
  />
))
.add('1/3 Selected', () => (
  <BranchProfile
    start={0}
    end={2}
    max={2}
    activeStateIndex={0}
    type="current"
  />
))
.add('2/3 Selected', () => (
  <BranchProfile
    start={0}
    endsAt={10}
    max={2}
    type="current"
    end={2}
    activeStateIndex={1}
  />
))
.add('3/3 Selected', () => (
  <BranchProfile
    start={0}
    end={2}
    max={2}
    activeStateIndex={2}
    type="current"s
  />
))
.add('Half in Middle', () => (
  <BranchProfile
    start={3}
    end={7}
    max={12}
    type="legacy"
    activeStateIndex={4}
  />
))
.add('Half Length', () => (
  <BranchProfile
    start={0}
    max={20}
    type="legacy"
    end={10}
    activeStateIndex={10}
  />
));
