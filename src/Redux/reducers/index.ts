import { combineReducers } from 'redux';
import jobsData from './jobs';
import skills from './skills';
import {IJob} from '../../types/jobs';
import {ISkill} from '../../types/skills';

export const initialState = {
  jobsData: {
    jobsPage: 0,
    jobsFirstLoad: false,
    jobs: {},
  },
  skills: {},
};


const rootReducer = combineReducers({ jobsData,skills });

export interface RootState {
  jobsData: {
    jobsPage: number,
    jobsFirstLoad: boolean,
    jobs: {[key: string] :IJob},
  }
  skills: {[key: string] : ISkill},
};

export default rootReducer;
