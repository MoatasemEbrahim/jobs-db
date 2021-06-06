
import axiosInstance from '../utils/axiosInstance';

const jobsAPI = {
  getJobs: async (page:number) => {
    const res = await axiosInstance.get('/jobs',{
      params:{
        offset:page * 11,
        limit: 11
      }
    });
    return res.data;
  },
  getJobsSearchOptions: async (text:string) => {
    const res = await axiosInstance.get('/jobs/autocomplete',{
      params:{
        contains: text
      }
    });
    return res.data;
  },
  getOneJob: async (jobId:string) => {
    const res = await axiosInstance.get(`/jobs/${jobId}`);
    return res.data;
  },
  getRelatedJobs: async (jobId:string) => {
    const res = await axiosInstance.get(`/jobs/${jobId}/related_jobs`);
    return res.data;
  },
  getJobRelatedSkills: async (jobId:string) => {
    const res = await axiosInstance.get(`/jobs/${jobId}/related_skills`);
    return res.data;
  },
};

export default jobsAPI;