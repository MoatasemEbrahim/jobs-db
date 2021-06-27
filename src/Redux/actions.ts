import {  SET_SKILLS, SET_JOBS,SET_JOBS_PAGE,SET_JOBS_FIRST_LOAD } from './constants';

const createAction = type => payload => ({
  type,
  payload,
});


export const setJobs = createAction(SET_JOBS);

export const setSkills = createAction(SET_SKILLS);

export const setJobsPage = createAction(SET_JOBS_PAGE)

export const setJobsFirstLoad = createAction(SET_JOBS_FIRST_LOAD)
