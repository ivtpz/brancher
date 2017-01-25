const openTutorial = () => {
  return { type: 'OPEN_TUTORIAL' };
};

const closeTutorial = () => {
  return { type: 'CLOSE_TUTORIAL' };
};

const viewNext = () => {
  return { type: 'VIEW_NEXT' };
};

const viewPrevious = () => {
  return { type: 'VIEW_PREVIOUS' };
};

const setTutorialLength = (len) => {
  return {
    type: 'SET_LENGTH',
    totalPopUps: len
  };
};

export default {
  openTutorial,
  closeTutorial,
  viewNext,
  setTutorialLength,
  viewPrevious
};