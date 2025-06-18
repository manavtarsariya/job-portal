import { setAllApliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utills/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllApliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppliedJobs();
    }, [dispatch]);

    return;
};

export default useGetAppliedJobs;
