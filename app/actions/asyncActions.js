import AsyncQueue from '../utils/asyncQueueStructures';

let asyncQueue = new AsyncQueue();

const endAsync = () => {
  return { type: 'ASYNC_INACTIVE' };
};

const callAsync = (dispatchFn, delay = 500, dispatchEnd, newState) => {
  asyncQueue.add(dispatchFn, delay, newState);
  return { type: 'ASYNC_ACTIVE' };
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
  setDelay
};
