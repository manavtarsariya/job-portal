import React, { useEffect, useState } from 'react'
import Job from './Jobcard';
import Navbar from './shared/Navbar';
import Filtercard from './FilterCard';
import { useSelector } from 'react-redux';
import useGetAllJobs from './hooks/useGetAllJobs';
import { Button } from './ui/button';
import { FlipHorizontal, FlipHorizontal2, FoldHorizontal, GripHorizontal, LineChartIcon, LucideFlipHorizontal, LucideThermometer, MenuIcon, Minimize, MoreHorizontalIcon, MoveRight, ScanLine } from 'lucide-react';
import Footer from './shared/Footer';


const Jobs = () => {


    const { alljobs, filterjobQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(alljobs);

    useGetAllJobs();

    useEffect(() => {
        if (filterjobQuery) {
            const filteredjobs = alljobs?.filter((job) => {

                return job?.jobType?.toLowerCase().includes(filterjobQuery.toLowerCase()) ||
                    job?.location?.toLowerCase().includes(filterjobQuery.toLowerCase()) ||
                    (filterjobQuery != 10 && job?.salary <= filterjobQuery) ||
                    (filterjobQuery == 10 && job?.salary >= filterjobQuery)

            })
            setFilterJobs(filteredjobs);
        } else {
            setFilterJobs(alljobs);
        }
    }, [alljobs, filterjobQuery])



    const [temp, settemp] = useState(false)

    useEffect(() => {
        const temp = window.matchMedia("(max-width: 64rem)"); // 64rem = 1024px

        const handleResize = () => {
            settemp(temp.matches); // Set x to false if width is less than 64rem
        };
        handleResize()
    }, [])




    return (
        <div >
            <Navbar />



            <div className=" max-w-7xl mx-auto mt-3 mb-5 ">
                <h1 className={`group font-bold max-lg:text-md text-lg mt-7 w-fit flex items-center  text-black hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer`} onClick={() => settemp(!temp)} >
                    <MenuIcon className='h-4 text-red-400 group-hover:text-red-500 ' />
                    Filter Jobs
                </h1>


                <div className="flex gap-5">

                    {
                        !temp ? (
                            <div onClick={() => { }} className={`  transition-transform duration-500 ease-in-out`}>
                                {/* <div className='bg-amber-200'> */}
                                <Filtercard />
                                {/* </div> */}
                            </div>
                        ) : null
                    }



                    <div className="flex-1 overflow-y-auto w-full overflow-x-hidden bg-ambr-300 p-10">
                        {
                            filterJobs?.length <= 0 ?

                                (
                                    <div className='col-span-3 text-center'>No Jobs Are Available</div>
                                ) :

                                (
                                    <div className="  grid grid-cols-1 lg:grid-cols-3  gap-4 ">
                                        {
                                            filterJobs.map(
                                                (job) => (
                                                    <div key={job?._id}>
                                                        <Job job={job} />
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Jobs