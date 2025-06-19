





import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Jobcard';
import { useDispatch, useSelector } from 'react-redux';
import { setsearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from './hooks/useGetAllJobs';
import Footer from './shared/Footer';



const Browse = () => {
    // const alljobs = []
    useGetAllJobs()

    const { alljobs } = useSelector(store => store.job);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setsearchedQuery(""))
    }, [dispatch])




    return (
        <div className='flex flex-col min-h-screen ' >
            <Navbar />

            <div className='flex-grow w-full'>


                <div className=' max-w-7xl mx-auto overflow-x-hidden  '>

                    <div className='text-2xl font-bold mt-5  text-center'>Search Result <span className='text-[#5638c2]'>({alljobs.length})</span></div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 p-10 '>
                        {
                            alljobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))
                        }

                    </div>

                </div>
            </div>




            {/* <div className='flex flex-col align-bottom relative -bottom-100 w-full'> */}

            <Footer />
            {/* </div>   */}
        </div>
    )
}

export default Browse