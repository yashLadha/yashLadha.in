import * as ActionTypes from './ActionTypes';

export const Reducer = (
  state = {
    projectsList: [],
    projectInfo: {},
    socialList: [],
    skillsList: [],
    githubData: {},
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
    case ActionTypes.ADD_SKILLS:
      return {
        ...state,
        skillsList: action.payload,
      };
    case ActionTypes.FETCH_GIT_DATA:
      return {
        ...state,
        githubData: action.payload,
      };
    default:
      return state;
  }
};
