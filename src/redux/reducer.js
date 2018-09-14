import * as ActionTypes from './ActionTypes';

export const Reducer = (
  state = {
    projectsList: [],
    projectInfo: {},
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROJECTS:
      return {
        ...state,
        projectsList: action.payload,
      };
    case ActionTypes.PROJECT_INFO:
      return {
        ...state,
        projectInfo: action.payload,
      };
    default:
      return state;
  }
};
