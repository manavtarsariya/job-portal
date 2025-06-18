import React, { useState } from 'react'
import { Button } from './ui/button';
import { QrCode, Search } from 'lucide-react';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsearchedQuery } from '@/redux/jobSlice';
// import { toast } from 'sonner';

const Herosection = () => {
    const [Query, setQuery] = useState("")



    // const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchHandler = () => {
   
        dispatch(setsearchedQuery(Query));
        navigate("/browse");
    }



    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 py-5 overflow-x-hidden">


              

                <div class="bg-white py-10 text-center">

                    <h1 class="lg:text-5xl p-4 text-3xl font-bold text-fuchsia-700 transform hover:scale-110 transition-transform duration-400 ease-linear cursor-pointer ">Welcome to Your Dream Job Portal</h1>
                    <p class="mt-4 lg:text-lg text-md p-2  text-gray-600">
                        Discover thousands of jobs tailored to your skills. Your next opportunity awaits!
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-10   ">
                        <div class="p-5 bg-white shadow rounded-md border cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                            <h3 class="text-xl font-bold text-indigo-600 cursor-pointer">Find Jobs</h3>
                            <p class="text-gray-600 mt-2">Search and explore opportunities in your field.</p>
                        </div>
                        <div class="p-5 bg-white shadow rounded-md border cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                            <h3 class="text-xl font-bold text-indigo-600 ">Apply Easily</h3>
                            <p class="text-gray-600 mt-2">Submit your applications with just one click.</p>
                        </div>
                        <div class="p-5 bg-white shadow rounded-md cursor-pointer border hover:scale-105 transition-transform duration-300 ease-in-out">
                            <h3 class="text-xl font-bold text-indigo-600">Get Hired</h3>
                            <p class="text-gray-600 mt-2">Start your journey with top companies today.</p>
                        </div>
                    </div>
                   
                </div>



                <h1 className="max-lg:p-3 text-5xl font-bold ">
                    Search, Apply & <br /> Get Your{' '}
                    <span className="text-[#5638c2]">Dream Job</span>
                </h1>

                <div className="flex md:w-[40%] md:h-[9vh] h-15 my-5  shadow-lg border-none border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-gradient-to-r from-orange-400/10 to-green-400/10">

                    <input
                        type="text"
                        value={Query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your dream jobs"
                        className="outline-none border-none w-full p-2 box-border "
                    />
                    <Button onClick={searchHandler} className=" md:h-[9vh] md:w-[9vh] h-15 w-12 rounded-r-full bg-[#5638c2] cursor-pointer border-none box-border">
                        <Search className='h-7 w-7' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Herosection