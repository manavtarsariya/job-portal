



import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utills/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';



const useGetCompanyByid = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchingSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchingSingleCompany();
    },[companyId, dispatch])
    // might empty 
};

export default useGetCompanyByid;
