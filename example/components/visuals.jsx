import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    pickRandomColor,
    increment,
    decrement,
} from "../state/Actions";

const RawVisualA = ({backgroundColor, actions: {pickRandomColor}}) => (
  <div
    className="visual-a"
    style={{backgroundColor}}
    onClick={pickRandomColor}
  >
    <h1>Color: {backgroundColor}</h1>
  </div>
);

export const VisualA = connect(
  ({current: {visuals: {color}}}) => ({backgroundColor: color}),
  dispatch => ({ actions: bindActionCreators({pickRandomColor}, dispatch)}),
)(RawVisualA);

const RawVisualB = ({value, actions: {increment, decrement}}) => (
  <div className="visual-b">
    <div>
      <h1>Value: {value}</h1>
    </div>
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  </div>
);

export const VisualB = connect(
  ({current: {visuals: {value}}}) => ({value}),
  dispatch => ({ actions: bindActionCreators({increment, decrement}, dispatch)}),
)(RawVisualB);
