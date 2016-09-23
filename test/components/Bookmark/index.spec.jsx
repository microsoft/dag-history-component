import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Bookmark from '../../../src/components/Bookmark';
import EditBookmark from '../../../src/components/Bookmark/EditBookmark';

describe('Bookmark Component', () => {
  it('exists', () => {
    expect(document).to.be.ok;
    expect(Bookmark).to.be.ok;
  });

  it('can render into the DOM', () => {
    const rendered = mount(
      <Bookmark name="My Name" annotation="anno" />
    );
    expect(rendered.find('.bookmark-input').length).to.equal(0);
    expect(rendered.find('.bookmark-title').length).to.equal(1);
    expect(rendered.find('.bookmark-annotation').length).to.equal(1);
  });

  it('will render with a selected class if it has the active attribute set', () => {
    const rendered = mount(
      <Bookmark active name="My Name" annotation="anno" />
    );
    expect(rendered.find('.history-bookmark .selected').length).to.equal(1);
  });

  it('will render without a selected class if it has the active attribute set', () => {
    const rendered = mount(
      <Bookmark name="My Name" annotation="anno" />
    );
    expect(rendered.find('.history-bookmark .selected').length).to.equal(0);
  });

  it('will flip into edit mode when the title clicked on', () => {
    const rendered = mount(
      <Bookmark name="My Name" annotation="anno" />
    );
    rendered.find('.bookmark-title').simulate('click');
    expect(rendered.find('.bookmark-input').length).to.equal(2);
  });

  it('will flip into edit mode when the annotation is clicked on', () => {
    const rendered = mount(
      <Bookmark name="My Name" annotation="anno" />
    );
    rendered.find('.bookmark-annotation').simulate('click');
    expect(rendered.find('.bookmark-input').length).to.equal(2);
  });

  /**
   * TODO: We can't verify override currentTarget in the blur event in mount(),
   * and refs won't work in shallow(). ¯\_(ツ)_/¯
   */
  xit('will pop out of edit mode on blur action', () => {
    let done = false;
    const doneEditing = () => (done = true);
    const rendered = mount(
      <EditBookmark name="My Name" annotation="anno" onDoneEditing={doneEditing} />
    );
    rendered.find('.bookmark-details-editable').simulate('blur');
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(done).to.be.true;
        resolve();
      }, 10);
    });
  });
});
