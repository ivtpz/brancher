const endAsync = () => {
  return { type: 'ASYNC_INACTIVE' };
};

let queuedActions = 0;

const callAsync = (dispatchFn, delay = 500, dispatchEnd, newState) => {
  queuedActions++;
  setTimeout(
    () => {
      queuedActions--;
      dispatchFn(newState);
      if (queuedActions === 0) {
        dispatchEnd();
      }
    },
    queuedActions * delay
  );
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
