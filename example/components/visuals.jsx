import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    pickRandomColor as doPickRandomColor,
    increment as doIncrement,
    decrement as doDecrement,
} from '../state/Actions';

const RawVisualA = ({ backgroundColor, actions: { pickRandomColor } }) => (
  <div
    className="visual-a"
    style={{ backgroundColor }}
    onClick={pickRandomColor}
  >
    <h1>Color: {backgroundColor}</h1>
  </div>
);
RawVisualA.propTypes = {
  backgroundColor: PropTypes.string,
  actions: PropTypes.shape({
    pickRandomColor: PropTypes.func,
  }),
};

export const VisualA = connect(
  ({ current: { visuals: { color } } }) => ({ backgroundColor: color }),
  dispatch => ({ actions: bindActionCreators({ pickRandomColor: doPickRandomColor }, dispatch) })
)(RawVisualA);

const RawVisualB = ({ value, actions: { increment, decrement } }) => (
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
RawVisualB.propTypes = {
  value: PropTypes.number,
  actions: PropTypes.shape({
    increment: PropTypes.func,
    decrement: PropTypes.func,
  }),
};

export const VisualB = connect(
  ({ current: { visuals: { value } } }) => ({ value }),
  dispatch => ({
    actions: bindActionCreators({
      increment: doIncrement,
      decrement: doDecrement,
    }, dispatch),
  })
)(RawVisualB);
