import React from 'react'
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowRight, Briefcase, Building2, DollarSign, MapPin, Users } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';

const LatestJobCards = ({ job }) => {

    const navigate = useNavigate()



    const { user } = useSelector(store => store.auth);



    const clickHandler = () => {
        if (user == null) {
            toast.success("Please Log in to see more job details.")
            return;
        }
        navigate(`/jobdetails/${job._id}`)
    }


    return (

        <div
            onClick={() => clickHandler()}
            className="group relative bg-gradient-to-r from-[#FF5733]/10 to-[#3B82F6]/10 border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-blue-300 hover:shadow-lg overflow-hidden "
        >

            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">

                        <Avatar className="h-13 w-13 rounded-xl border-2 border-white shadow-md">
                            <AvatarImage src={job?.company?.logo} className="object-cover" />
                        </Avatar>

                    </div>
                    <div >
                        <div className="flex items-center gap-1 text-gray-500">
                            <Building2 className="w-4 h-3.5   text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />

                            <h1 className="font-semibold  text-lg text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                {job?.company?.name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span className="text-sm">{job?.location}</span>
                        </div>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
            </div>

            {/* Job Details */}
            <div className="mb-5 ">
                <div className="flex items-center justify-center gap-2 mb-2 text-center">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <h2 className="font-medium  text-gray-900 text-base group-hover:text-gray-700 transition-colors duration-300">
                        {job?.title}
                    </h2>
                </div>

                <p className="text-sm text-gray-600 h-10 line-clamp-2 text-ellipsis ">
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center ">
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 font-medium px-3 py-1 rounded-full text-xs" variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {job?.position} positions
                </Badge>
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 font-medium px-3 py-1 rounded-full text-xs" variant="outline">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 font-medium px-3 py-1 rounded-full text-xs" variant="outline">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </div>
    );
}

export default LatestJobCards