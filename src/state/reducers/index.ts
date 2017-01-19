import {
  IConfiguration, // eslint-disable-line no-unused-vars
} from '@essex/redux-dag-history/lib/interfaces';
import * as redux from 'redux';
import dragDrop from './dragDrop';
import views from './views';
import playback from './playback';
import bookmarks from './bookmarks';

export default function createReducer(config: IConfiguration<any>) {
  return redux.combineReducers({
    dragDrop: dragDrop(config),
    views: views(config),
    playback: playback(config),
    bookmarks,
  });
}
