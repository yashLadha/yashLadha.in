import * as ActionTypes from './ActionTypes';

export const Reducer = (
  state = {
    projectsList: [],
    projectInfo: {},
    socialList: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROJECTS:
      return {
        ...state,
        projectsList: action.payload,
      };
    case ActionTypes.ADD_SOCIAL_MEDIA:
      return {
        ...state,
        socialList: action.payload,
      };
    default:
      return state;
  }
};
