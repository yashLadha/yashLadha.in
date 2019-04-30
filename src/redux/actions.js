import * as ActionTypes from './ActionTypes'
import { SOCIAL_MEDIA } from '../shared/SocialMedia'
import { PROJECTS } from '../shared/Projects'
import { SKILLS } from '../shared/Skills'

export const fetchProjects = () => dispatch => {
	dispatch(addProjects(PROJECTS))
}

export const addProjects = projects => ({
	type: ActionTypes.ADD_PROJECTS,
	payload: projects,
})

export const fetchSocialMedia = () => dispatch => {
	dispatch(addSocialMedia(SOCIAL_MEDIA))
}

export const addSocialMedia = socialMedia => ({
	type: ActionTypes.ADD_SOCIAL_MEDIA,
	payload: socialMedia,
})

export const fetchSkills = () => ({
	type: ActionTypes.ADD_SKILLS,
	payload: SKILLS,
})
