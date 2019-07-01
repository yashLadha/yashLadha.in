import axios from 'axios';
import { EVENT_LINK } from '../shared/Constants';
import { PROJECTS } from '../shared/Projects';
import { SKILLS } from '../shared/Skills';
import { SOCIAL_MEDIA } from '../shared/SocialMedia';
import * as ActionTypes from './ActionTypes';

const gitInstance = axios.create({
  timeout: 10000,
});

export const fetchProjects = () => dispatch => {
  dispatch(addProjects(PROJECTS));
};

export const addProjects = projects => ({
  type: ActionTypes.ADD_PROJECTS,
  payload: projects,
});

export const fetchSocialMedia = () => dispatch => {
  dispatch(addSocialMedia(SOCIAL_MEDIA));
};

export const addSocialMedia = socialMedia => ({
  type: ActionTypes.ADD_SOCIAL_MEDIA,
  payload: socialMedia,
});

export const fetchSkills = () => ({
  type: ActionTypes.ADD_SKILLS,
  payload: SKILLS,
});

export const fetchGithubPublicEvents = () => async dispatch => {
  try {
    const response = await gitInstance.get(EVENT_LINK, {
      params: {
        per_page: 100,
      },
    });
    const displayData = {};
    response.data
      .map(val => new Date(val.created_at).toDateString())
      .reduce((map, val) => {
        map[val] = (map[val] || 0) + 1;
        return map;
      }, displayData);
    const parsedData = Object.keys(displayData).map(val => {
      const dateObj = new Date(val);
      return {
        xAxisRep: `${dateObj.getDate()}/${dateObj.getMonth()}`,
        timestamp: val,
        contributions: displayData[val],
      };
    });

    dispatch(addGithubData(parsedData));
  } catch (err) {
    console.error(err);
  }
};

export const addGithubData = displayData => ({
  type: ActionTypes.FETCH_GIT_DATA,
  payload: displayData,
});
