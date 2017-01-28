import { Map } from 'immutable';

const tutorial = (
  state = Map({
    active: false,
    current: 0,
    totalPopUps: 0,
    highlightHelp: false
  }),
  action
) => {
  switch (action.type) {
    case 'OPEN_TUTORIAL':
      return state.merge(Map({
        active: true,
        current: 1
      }));
    case 'CLOSE_TUTORIAL':
      return state.set('active', false);
    case 'VIEW_NEXT':
      return state.get('current') === state.get('totalPopUps') ?
        state.merge(Map({
          active: false,
          current: 0
        })) :
        state.set('current', state.get('current') + 1);
    case 'VIEW_PREVIOUS':
      return state.set('current', state.get('current') - 1);
    case 'TOGGLE_HELP_HIGHLIGHT':
      return state.set('highlightHelp', !state.get('highlightHelp'));
    default:
      return state;
  }
};

export default tutorial;