import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import BookmarkList from '../../../src/components/BookmarkList';
import Bookmark from '../../../src/components/Bookmark';

describe('The BookmarkList Component', () => {
  it('can render a set of bookmarks', () => {
    const rendered = mount(
      <BookmarkList
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

  it('can propagate up bookmark clicks', () => {
    let clicked = null;
    const rendered = mount(
      <BookmarkList
        onBookmarkClick={id => clicked = id}
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

    rendered.find(Bookmark).at(1).simulate('click');
    expect(clicked).to.equal(2);
  });

  it('can handle click events when no handler is defined', () => {
    const rendered = mount(
      <BookmarkList
        bookmarks={[
          {
            index: 0,
            stateId: 1,
            name: 'Bookmark 1',
            annotation: 'Anno 1',
            active: true,
          }
        ]}
      />
    );
    rendered.find(Bookmark).at(0).simulate('click');
  });

  /**
   * TODO: Enable this test when jsdom supports div.dataset
   * See: https://github.com/tmpvar/jsdom/issues/961
   */
  xit('can reorder bookmarks via drag-and-drop', () => {
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
    let bookmarks = rendered.find('.history-bookmark');
    const first = bookmarks.at(0);
    const second = bookmarks.at(1);
    const third = bookmarks.at(2);
    first.simulate('dragstart', {
      dataTransfer: {
        setData() {},
        currentTarget: first["node"],
      },
    });
    second.simulate('dragover');
    third.simulate('dragover');
    first.simulate('dragend');

    bookmarks = rendered.find('.history-bookmark');
    expect(bookmarks.at(0)).to.equal(second);
    expect(bookmarks.at(1)).to.equal(third);
    expect(bookmarks.at(2)).to.equal(first);
  });
});
