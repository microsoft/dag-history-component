import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Bookmark from '../../../src/components/Bookmark';

storiesOf('Bookmark', module)
.add('Inactive', () => (
  <Bookmark
    name="Some Bookmark Name"
    annotation="Some Bookmark Annotation Text. Derp Depr Derp Derp"
    index={1}
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    onBookmarkChange={action('bookmarkChange')}
  />
))
.add('Active', () => (
  <Bookmark
    name="Some Bookmark Name"
    annotation="Some Bookmark Annotation Text. Derp Depr Derp Derp"
    index={1}
    onClick={action('click')}
    onContinuationClick={action('continuationClick')}
    onBookmarkChange={action('bookmarkChange')}
    active
  />
));
