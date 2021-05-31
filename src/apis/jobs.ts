
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
};

export default jobsAPI;