



import { setAlljobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utills/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// 😊
// it is a custom hook. why ? : ( mere ko ye all job fetch karne ka logic bar bar nahi likhna hoga , " agar me chahu to har ek page me , jaha mere ko sari jobs ki need hai to ye code likh sakta hu "but  is hook use krne se wo code nahi likhna padegaa).

// kind of ye hame logic ko reuse karne ka moka deta hai 
// difference between react component and custom hook
// in react comp. it include logic + ui part , while customhook contain only logic part like this 
// most of the custom hook me built in hook( usestate, useeffect hook) use hote hi hai.



const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store => store.job)
    
    useEffect(() => {
       
        const fetchAllJobs = async () => {
            
            try {
                // withCredentials: true: Ensures that cookies or authentication tokens are included in the request.
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`);
                if (res.data.success) {
                    dispatch(setAlljobs(res.data.jobs));
                }

            } catch (error) {
                console.log(error);
            }
        };
        fetchAllJobs();
    },[dispatch, searchedQuery])
    
};

export default useGetAllJobs;
