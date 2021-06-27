import {initialState} from './index';
import {SET_SKILLS} from '../constants';

const skills = (skills = initialState.skills, action) => {
  switch (action.type) {
    case SET_SKILLS:
      return {...skills,...action.payload};
    default:
      return skills;
  }
}

export default skills;
