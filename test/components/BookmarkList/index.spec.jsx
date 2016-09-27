import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import BookmarkList from '../../../src/components/BookmarkList';

describe('The BookmarkList Component', () => {
  it('can render a set of bookmarks', () => {
    const rendered = mount(
      <BookmarkList
        onBookmarkMove={() => ({})}
        bookmarks={[
          {
            index: 0,
            stateId: 1,
            name: 'Bookmark 1',
            annotation: 'Anno 1',
            active: true,
          },
          {
            index: 1,
            stateId: 2,
            name: 'Bookmark 2',
            annotation: 'Anno 2',
            active: false,
          },
          {
            index: 2,
            stateId: 3,
            name: 'Bookmark 3',
            annotation: 'Anno 3',
            active: false,
          },
        ]}
      />
    );
    expect(rendered.find('.history-bookmark').length).to.equal(3);
    expect(rendered).to.be.ok;
  });
});
