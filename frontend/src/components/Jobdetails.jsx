import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utills/constants';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

import {
    MapPin,
    Calendar,
    Users,
    Briefcase,
    DollarSign,
    Clock,
    FileText,
    Building2,
    CheckCircle,
    Send,
    Handshake,
    ChartBarIcon,
    Link2,
    IndianRupee
} from 'lucide-react';

import Navbar from './shared/Navbar';

const Jobdetails = () => {


    const param = useParams();
   
    const jobId = param.id;
 
    const { SingleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    // why this initialapplied : (assume : isapplied is false there is not initialapplied) component pe janeke apply kr dia now it is true (isApplied) but refresh karte time ye component firse render karte time iApplied false ban jayega and minor time ke liye apply now ayega jaise hi useEfect run hoga to firse already applied aa jayega ......  

    // so isi minor time ke liye apply now na aye or already applied aye uske ke liye ye( khel of initialapplied ) kia hai

    const initialApplied = SingleJob?.application?.some(application => application.applicant === user.id) || false;
    const [isApplied, setisApplied] = useState(initialApplied)

    // The some() method in JavaScript checks if at least one element in an array satisfies a given condition. It returns a boolean value: true if the condition is met for any element, and false otherwise.



    const applyJobHandler = async () => {

        try {

            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setisApplied(true);

                const updatesinglejob = {
                    ...SingleJob,
                    application: [...SingleJob.application, { applicant: user?.id }]
                };

                dispatch(setSingleJob(updatesinglejob))
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }

    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setisApplied(res.data.job.application.some(application => application.applicant === (user?._id || user?.id )))
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchSingleJob();
    }, [dispatch, jobId, user?._id, user.id])




    return (
        <>
            {/* <div className={`background-color : red`}> */}
            <Navbar/>
            {/* </div> */}
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Header Card */}

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                        {/* Gradient Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-40 relative">
                            <div className="absolute inset-0 bg-black/10"> </div>



                            <div className='group absolute bottom-0  drop-shadow-2xl '>

                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>


                                <div className="absolute -bottom-12 left-8  z-10  cursor-pointer  rounded-[60px] brder-amber-800 hover:scale-110 transition-transform ease-out duration-500 ">
                                    <Avatar className="h-31 w-31 shadow-lg bg-white    ">
                                        <AvatarImage src={user?.profile?.profilePhoto} className="object-cover " />
                                    </Avatar>
                                </div>



                                <div className="absolute -bottom-12 left-33 cursor-pointer hover:scale-110 transition-transform ease-out duration-500 ">
                                    <Avatar className="h-31 w-31 border-white shadow-lg bg-gray-100">
                                        <AvatarImage src={SingleJob?.company?.logo} className="object-cover" />
                                    </Avatar>
                                </div>
                            </div>
                        </div>

                        {/* Company Info */}
                        <div className="pt-16 pb-8 px-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div className="flex-1">

                                    <div className="flex items-center gap-3 mb-2">
                                        <Building2 className="h-5 w-5 text-gray-500" />
                                        <span className="text-lg font-semibold text-gray-600">{SingleJob?.company?.name}</span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{SingleJob?.title}</h1>

                                    <div className="flex flex-wrap gap-3">
                                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 font-semibold px-4 py-2">
                                            <Users className="h-4 w-4 mr-2" />
                                            {SingleJob?.position} Positions
                                        </Badge>
                                        <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 font-semibold px-4 py-2">
                                            <Briefcase className="h-4 w-4 mr-2" />
                                            {SingleJob?.jobType}
                                        </Badge>
                                        <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 font-semibold px-4 py-2">
                                            {/* <DollarSign className="h-4 w-4 mr-2" /> */}
                                            <IndianRupee className="h-4 w-4 mr-2"/>
                                            {SingleJob?.salary}LPA
                                        </Badge>
                                    </div>
                                </div>

                                <div className="lg:text-right">
                                    <Button
                                        onClick={isApplied ? null : applyJobHandler}
                                        disabled={isApplied}
                                        size="lg"
                                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${isApplied
                                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                            }`}
                                    >
                                        {isApplied ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                Already Applied
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5 mr-2" />
                                                Apply Now
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Details Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* Section Header */}

                        <div className="bg-gradient-to-r from-gray-200 to-blue-200/25 px-8 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Company Hiring Banner */}
                            <div className="bg-gradient-to-r from-red-100 to-purple-200 rounded-xl p-6 mb-8 border border-blue-100">
                                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                                    🎉 {SingleJob?.company?.name} is Hiring!
                                </h3>
                                <p className="text-center text-gray-600">Join our amazing team and grow your career with us</p>
                            </div>

                            {/* Description Section */}
                            <div className=" mb-8 mt-8 p-6 bg-gradient-to-r from-gray-200 to-gray-300/30 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="h-6 w-6 bg-purple-100 rounded flex items-center justify-center">
                                        <FileText className="h-3 w-3 text-purple-600" />
                                    </div>
                                    Description
                                </h4>
                                <p className="text-black leading-relaxed">{SingleJob?.description}</p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div className="flex items-center  gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Briefcase className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Role</h4>
                                            <p className="text-gray-700">{SingleJob?.title}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Location</h4>
                                            <p className="text-gray-700">{SingleJob?.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {/* <DollarSign className="h-5 w-5 text-green-600" /> */}
                                            <IndianRupee className="h-5 w-5 text-green-600"/>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Salary</h4>
                                            <p className="text-gray-700">{SingleJob?.salary} LPA</p>
                                        </div>
                                    </div>


                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Total Applicants</h4>
                                            <p className="text-gray-700">{SingleJob?.application?.length}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="h-10 w-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Calendar className="h-5 w-5 text-pink-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Posted Date</h4>
                                            <p className="text-gray-700">{SingleJob?.createdAt?.split("T")[0]}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Experience</h4>
                                            <p className="text-gray-700">{SingleJob?.experienceLevel} yrs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements Section */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-gray-300 to-blue-200/30 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="h-6 w-6 bg-blue-100 rounded flex items-center justify-center">
                                        <FileText className="h-3 w-3 text-blue-600" />
                                    </div>
                                    Requirements
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {SingleJob?.requirements?.map((req, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-100 font-semibold px-3 py-1"
                                            variant="outline"
                                        >
                                            {req}
                                        </Badge>
                                    ))}
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Jobdetails