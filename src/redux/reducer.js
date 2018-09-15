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
    default:
      return state;
  }
};
