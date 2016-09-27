import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Promise from 'bluebird';
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
    let rendered = mount(
      <Bookmark active name="My Name" annotation="anno" />
    );
    expect(rendered.find('.history-bookmark .selected').length).to.equal(1);
    rendered = mount(
      <EditBookmark active name="My Name" annotation="anno" />
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

  it('will pop out of edit mode when the bookmark-details div is blurred', () => {
    let done = false;
    const doneEditing = () => (done = true);
    const rendered = mount(
      <EditBookmark name="My Name" annotation="anno" onDoneEditing={doneEditing} />
    );
    rendered.find('.bookmark-details-editable').simulate('blur');
    return Promise.delay(10)
    .then(() => {
      expect(done).to.be.true;
    });
  });

  it('will emit a change when the title input is blurred', () => {
    let changesReceived = 0;
    const doneEditing = () => ({});
    const receiveChange = (change) => {
      changesReceived += 1;
      expect(change.name).to.equal('abc123');
    };
    const rendered = mount(
      <EditBookmark
        name="My Name"
        annotation="anno"
        onDoneEditing={doneEditing}
        onBookmarkChange={receiveChange}
      />
    );
    rendered.find('.bookmark-title').node.value = 'abc123';
    expect(changesReceived).to.equal(0);
    rendered.find('.bookmark-title').simulate('blur');
    return Promise.delay(10)
    .then(() => {
      expect(changesReceived).to.equal(1);
    });
  });

  it('will emit a change when the annotation input is blurred', () => {
    let changesReceived = 0;
    const receiveChange = (change) => {
      changesReceived += 1;
      expect(change.data.annotation).to.equal('abc123');
    };
    const rendered = mount(
      <EditBookmark
        name="My Name"
        annotation="anno"
        onDoneEditing={() => ({})}
        onBookmarkChange={receiveChange}
      />
    );
    rendered.find('.bookmark-annotation').node.value = 'abc123';
    rendered.find('.bookmark-annotation').simulate('blur');
    return Promise.delay(10)
    .then(() => {
      expect(changesReceived).to.equal(1);
    });
  });

  it('will not emit onDoneEditing if the new focus target is within the edit component', () => {
    let done = false;
    const doneEditing = () => (done = true);
    const rendered = mount(
      <EditBookmark
        name="My Name"
        annotation="anno"
        onDoneEditing={doneEditing}
        onBookmarkChange={() => ({})}
      />
    );
    rendered.find('.bookmark-annotation').node.value = 'abc123';
    rendered.find('.bookmark-annotation').simulate('blur', {
      relatedTarget: rendered.find('.bookmark-annotation').node,
    });
    return Promise.delay(10)
    .then(() => {
      expect(done).to.be.false;
    });
  });
});
