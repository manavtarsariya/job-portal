import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';
import { Bookmark, Building2, Calendar, MapPin, Pin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';



const Job = ({ job }) => {

    const { user } = useSelector(store => store.auth)
    const jobId = `${job?._id}`;
    const navigate = useNavigate();

    const daysAgo = (mongodbTime) => {
        const createdtime = new Date(mongodbTime);
        const currenttime = new Date();
        // give defference in millisecond
        const timedifference = currenttime - createdtime;
        // deviding time with " millisecond in a day " to get answer in day
        return Math.floor(timedifference / (24 * 60 * 60 * 1000));
    }




    return (
        <div className="group cursor-pointer relative bg-gradient-to-br from-white via-white to-gray-50/30 border border-gray-200/60 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 p-6 max-w-100 w-full mx-auto backdrop-blur-sm">
            {/* Gradient border effect */}


            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

            {/* Header with date and bookmark */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm font-medium">
                        {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
                    </p>
                </div>

                <Pin
                    className=" fill-red-600  text-red-600  rotate-35 shadow-2xl  group-hover:scale-130  transform  group-hover:rotate-45 transition-transform  duration-300  ease-out">
                </Pin>

            </div>

            {/* Company info */}
            <div className="flex flex-wrap items-center gap-4 mb-4 w-full">

                <div className="relative">
                    <Avatar className="h-14 w-14 rounded-xl border-2 border-white shadow-md">
                        <AvatarImage src={job?.company?.logo} className="object-cover" />
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 w-full">
                        <Building2 className="h-4 w-4 text-gray-500 " />
                        <div className="font-bold text-lg text-gray-900 overflow-hidden text-ellipsis text-nowrap max-w-50 ">{job?.company?.name}</div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 w-full">
                        <MapPin className="h-3 w-3" />
                        <p className="text-sm overflow-hidden text-ellipsis text-nowrap max-w-50">{job?.location}</p>
                    </div>
                </div>
            </div>

            {/* Job title and description */}
            <div className="mb-6 text-center  ">
                <h1 className="font-bold text-xl text-gray-900 mb-3 truncate ">{job?.title }</h1>
                <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden text-ellipsis text-wrap ">{job?.description}</p>
            </div>

            {/* Enhanced badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200 font-semibold px-3 py-1"
                >
                    {job?.position} Positions
                </Badge>
                <Badge
                    variant="secondary"
                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 transition-colors duration-200 font-semibold px-3 py-1"
                >
                    {job?.jobType}
                </Badge>
                <Badge
                    variant="secondary"
                    className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors duration-200 font-semibold px-3 py-1"
                >
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Job Details button */}
            <div className="flex gap-3 mt-auto flex-wrap">

                <Button
                    onClick={
                        () => {

                            if (user) {
                                navigate(`/jobdetails/${jobId}`)
                            } else {
                                toast.success("Please Log in to see more job details.")
                            }

                        }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 cursor-pointer"
                >
                    View Details
                </Button>
            </div>
        </div>

    );
}

export default Job