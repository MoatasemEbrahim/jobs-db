import {initialState} from './index';
import {SET_JOBS,SET_JOBS_PAGE,SET_JOBS_FIRST_LOAD} from '../constants';

const jobs = (jobsData = initialState.jobsData, action) => {
  switch (action.type) {
    case SET_JOBS:
      return {...jobsData, jobs: {...jobsData.jobs,...action.payload}};
    case SET_JOBS_PAGE:
      return {...jobsData, jobsPage:action.payload};
    case SET_JOBS_FIRST_LOAD:
      return {...jobsData, jobsFirstLoad:action.payload};
    default:
      return jobsData;
  }
}

export default jobs;
