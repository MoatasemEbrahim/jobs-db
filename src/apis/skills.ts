
import axiosInstance from '../utils/axiosInstance';

const skillsAPI = {
  getSkillRelatedJobs: async (skillId:string) => {
    const res = await axiosInstance.get(`/skills/${skillId}/related_jobs`);
    return res.data;
  },
  getOneSkill: async (skillId:string) => {
    const res = await axiosInstance.get(`/skills/${skillId}`);
    return res.data;
  },
  getRelatedSkills: async (skillId:string) => {
    const res = await axiosInstance.get(`/skills/${skillId}/related_skills`);
    return res.data;
  }
};

export default skillsAPI;