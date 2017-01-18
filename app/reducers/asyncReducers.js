// put in safe guard to always finish queue before other actions
// check if delayed is active ?
// Add a filter to only delay certain actions
const async = (state = { delay: 500, delayed: false }, action) => {
  switch (action.type) {
    case 'ASYNC_ACTIVE':
      return { ...state, delayed: true };
    case 'ASYNC_INACTIVE':
      return { ...state, delayed: false };
    case 'SET_DELAY':
      return { ...state, delay: action.newDelay };
    default:
      return state;
  }
};

export default async;
