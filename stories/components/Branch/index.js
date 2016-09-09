import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Branch from '../../../src/components/Branch';

storiesOf('Branch', module)
.add('Branch with half-depth', () => (
  <Branch
    label="master"
    continuation={{ numContinuations: 12, isSelected: true }}
    onClick={action('clicked')}
    branchType="current"
    maxDepth={10}
    startsAt={0}
    endsAt={5}
  />
))
.add('Branch with an ative commit', () => (
  <Branch
    label="Enable Filtering"
    continuation={{ numContinuations: 9000, isSelected: true }}
    maxDepth={12}
    startsAt={5}
    endsAt={10}
    activeStateIndex={7}
    branchType="current"
  />
))
.add('Branch with inactive start', () => (
  <Branch
    label="My Branch"
    continuation={{ numContinuations: 2, isSelected: true }}
    maxDepth={30}
    startsAt={10}
    endsAt={20}
    branchType="legacy"
  />
));
