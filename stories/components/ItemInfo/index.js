import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ItemInfo from '../../../src/components/ItemInfo';

storiesOf('ItemInfo', module)
.add('Basic', () => (
  <ItemInfo
    label="Et qui corporis quia animi."
    continuation={{ count: 98098 }}
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
  />
))
.add('Active', () => (
  <ItemInfo
    label="Et qui corporis quia animi."
    continuation={{ count: 98098 }}
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    active
  />
))
.add('Pinned', () => (
  <ItemInfo
    label="Et qui corporis quia animi."
    continuation={{ count: 98098 }}
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    pinned
  />
))
.add('Active & Pinned', () => (
  <ItemInfo
    label="Et qui corporis quia animi."
    continuation={{ count: 98098 }}
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    active
    pinned
  />
));
