import * as ActionTypes from './ActionTypes';
import { PROJECTS } from '../shared/Projects';

export const fetchProjects = () => dispatch => {
  dispatch(addProjects(PROJECTS));
};

export const addProjects = projects => ({
  type: ActionTypes.ADD_PROJECTS,
  payload: projects,
});
