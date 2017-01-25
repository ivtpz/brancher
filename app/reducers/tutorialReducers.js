import { Map } from 'immutable';

const tutorial = (
  state = Map({
    active: false,
    current: 0,
    totalPopUps: 0
  }),
  action
) => {
  switch (action.type) {
    case 'OPEN_TUTORIAL':
      return state.set('active', true);
    case 'CLOSE_TUTORIAL':
      return state.set('active', false);
    case 'VIEW_NEXT':
      return state.set('current', state.get('current') + 1);
    case 'SET_LENGTH':
      return state.set('totalPopUps', action.totalPopUps);
    default:
      return state;
  }
};

export default tutorial;