import AsyncQueue from '../utils/asyncQueueStructures';

let asyncQueue = new AsyncQueue();

const endAsync = () => ({ type: 'ASYNC_INACTIVE' });

const startAsync = () => ({ type: 'ASYNC_ACTIVE' });

const callAsync = (dispatchFn, ...args) => (dispatch, getState) => {
  if (!asyncQueue.size) {
    asyncQueue.listenForEnd(dispatch.bind(null, endAsync()));
  }
  asyncQueue.add(dispatchFn, getState().async.delay, ...args);
  dispatch(startAsync());
};

const setDelay = (newDelay) => {
  return {
    type: 'SET_DELAY',
    newDelay
  };
};

export default {
  callAsync,
  endAsync,
  setDelay,
  startAsync
};
