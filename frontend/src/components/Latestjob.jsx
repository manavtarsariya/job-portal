

import LatestJobCards from './LatestJobCards';
import { JOB_API_END_POINT } from '@/utills/constants';
import useGetAllJobs from './hooks/useGetAllJobs';
import { useSelector } from 'react-redux';

// const randomjobs = [1,2,3,4,5,6,7,8];


const Latestjob = () => {

  

  useGetAllJobs();
  const {alljobs} = useSelector(store=> store.job);

  


  return (
    <div className='max-w-7xl mx-auto my-20 text-center '>
        <h1 className='text-4xl font-bold'> <span className='text-[#5638c2]'> Latest & Top</span> Job Openings</h1>
        <div className='grid md:grid-cols-3 gap-5 my-5 m-5 mt-7 p-6 max-sm:p-4 '>

            {
                alljobs?.length <= 0 ? <div className='col-span-3 text-center '>No Jobs Are Available</div> : 
                alljobs?.slice(0,6).map((job)=> <LatestJobCards key={job._id} job={job}/>)
            }
        </div>

    </div>
  )
}

export default Latestjob