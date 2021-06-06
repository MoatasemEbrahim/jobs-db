
import axiosInstance from '../utils/axiosInstance';

const skillsAPI = {
  getSkills: async (page:number) => {
    const res = await axiosInstance.get('/skills',{
      params:{
        offset:page,
        limit: 20
      }
    });
    return res.data;
  },
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