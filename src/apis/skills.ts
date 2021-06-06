
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
  getJobRelatedSkills: async (jobId:string) => {
    const res = await axiosInstance.get(`/jobs/${jobId}/related_skills`);
    return res.data;
  }
};

export default skillsAPI;