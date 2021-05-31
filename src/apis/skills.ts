
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
};

export default skillsAPI;