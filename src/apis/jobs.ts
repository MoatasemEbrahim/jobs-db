
import axiosInstance from '../utils/axiosInstance';

const jobsAPI = {
  getJobs: async (page:number) => {
    const res = await axiosInstance.get('/jobs',{
      params:{
        offset:page,
        limit: 20
      }
    });
    console.log(res.data)
    return res.data;
  },
};

export default jobsAPI;