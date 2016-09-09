import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import State from '../../../src/components/State';

storiesOf('State', module)
.add('Current, Active', () => (
  <State
    label="Added Search Criteria"
    branchType="current"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 4 }}
    active
  />
))
.add('Current, Inactive', () => (
  <State
    label="Added Search Criteria"
    branchType="current"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 2 }}
  />
))
.add('Legacy, Active', () => (
  <State
    label="Added Search Criteria"
    branchType="legacy"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 1 }}
    active
  />
))
.add('Legacy, Inactive', () => (
  <State
    label="Added Search Criteria"
    branchType="legacy"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 12 }}
  />
))
.add('Current, Unbookmarked', () => (
  <State
    label="Added Search Criteria"
    branchType="current"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 2 }}
    renderBookmarks
  />
))
.add('Legacy, Unbookmarked', () => (
  <State
    label="Added Search Criteria"
    branchType="legacy"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 2 }}
    renderBookmarks
  />
))
.add('Current, Bookmarked', () => (
  <State
    label="Added Search Criteria"
    branchType="current"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 2 }}
    renderBookmarks
    bookmarked
  />
))
.add('Legacy, Bookmarked', () => (
  <State
    label="Added Search Criteria"
    branchType="legacy"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 2 }}
    renderBookmarks
    bookmarked
  />
))
.add('Pinned', () => (
  <State
    label="Added Search Criteria"
    branchType="current"
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    continuation={{ count: 12 }}
    pinned
  />
));
