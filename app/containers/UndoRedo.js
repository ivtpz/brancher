import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo-immutable';
import { connect } from 'react-redux';

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => <div>
  <button onClick={onUndo} disabled={!canUndo}>
    Undo
  </button>
  <button onClick={onRedo} disabled={!canRedo}>
    Redo
  </button>
</div>;

const mapStateToProps = (dataType, state) => {
  return {
    canUndo: state[dataType].past.size > 0,
    canRedo: state[dataType].future.size > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  };
};

const UndoRedoCreator = dataType => {
  return connect(
    mapStateToProps.bind(this, dataType),
    mapDispatchToProps
  )(UndoRedo);
};

export default UndoRedoCreator;
