



import { setAllAdminJobs } from '@/redux/jobSlice';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utills/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';






const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchadminjobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchadminjobs();
    },[dispatch])
};

export default useGetAllAdminJobs;
