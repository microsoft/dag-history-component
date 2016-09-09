import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import State from '../../../src/components/State';

storiesOf('State', module)
.add('Current Branch - Active', () => (
  <State
    label="Added Search Criteria"
    branchType="current"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ numContinuations: 4 }}
    active
  />
))
.add('Current Branch - Inactive', () => (
  <State
    label="Added Search Criteria"
    branchType="current"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ numContinuations: 2 }}
  />
))
.add('Legacy Branch - Active', () => (
  <State
    label="Added Search Criteria"
    branchType="legacy"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ numContinuations: 1 }}
    active
  />
))
.add('Legacy Branch - Inactive', () => (
  <State
    label="Added Search Criteria"
    branchType="legacy"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ numContinuations: 12 }}
  />
));
