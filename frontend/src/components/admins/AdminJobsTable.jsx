import { Edit2, Eye, MoreHorizontal, Building2, Calendar, Users, MapPin, DeleteIcon, Delete, Drumstick, Trash, Trash2, LucideTrash2, Briefcase } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { JOB_API_END_POINT } from '@/utills/constants';
import axios from 'axios';
import { toast } from 'sonner';
import { setAllAdminJobs } from '@/redux/jobSlice';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AdminJobsTable = () => {


    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    const getStatusColor = (applicationCount) => {
        if (applicationCount === 0) return 'bg-gray-100 text-gray-600';
        if (applicationCount < 5) return 'bg-yellow-100 text-yellow-700';
        if (applicationCount < 10) return 'bg-blue-100 text-blue-700';
        return 'bg-green-100 text-green-700';
    };




    const dispatch = useDispatch()

    const handleDelete = async (jobId) => {


        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/removejob/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setAllAdminJobs(res.data.jobs))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.error("Error deleting job:", error);
        }

    }


    return (
        <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden md:block">
                <Table>
                    {allAdminJobs.length <= 0 ? (
                        <TableCaption className="py-8 text-gray-500">
                            You haven't created any jobs yet
                        </TableCaption>
                    ) : (
                        <TableCaption className="py-4 text-sm text-gray-500">
                            A list of jobs you have created
                        </TableCaption>
                    )}

                    <TableHeader>
                        <TableRow className="border-gray-200 hover:bg-gray-50">
                            <TableHead className="text-center font-semibold text-gray-700 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Company
                                </div>
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">Job Title</TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">
                                <div className="flex items-center justify-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Applications
                                </div>
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">
                                <div className="flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Date Posted
                                </div>
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        {filterJobs?.map((job) => (

                            job?.company?.name == undefined ?

                                <TableRow >


                                    <TableCell key={job._id} className="text-center text-gray-500" colSpan={4}>

                                        The user has deleted the company.
                                    </TableCell>


                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger >
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-43 p-2" align="start">
                                                <div className="space-y-1">
                                                    <button

                                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                                    >

                                                        <AlertDialog>

                                                            <AlertDialogTrigger className="flex items-center">  <LucideTrash2 className='w-4 h-4 mr-3 ' />Delete Job</AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will permanently delete the selected job
                                                                        <span className="font-semibold text-black">{` ${job?.title} `}</span>.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(`${job._id}`)} > <LucideTrash2 className='w-4 h-4 font-extralight' />Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>


                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>

                                
                                :


                                <TableRow key={job._id} className="border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                    <TableCell className="text-center py-6">
                                        <div className="font-semibold text-gray-900">{job?.company?.name}</div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="font-medium text-gray-900">{job?.title}</div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={`${getStatusColor(job?.application?.length || 0)} border-0`}>
                                            {job.application?.length || 0} applications
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="text-gray-600">{job?.createdAt?.split("T")[0]}</div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger >
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-43 p-2" align="start">
                                                <div className="space-y-1">
                                                    <button

                                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                                    >

                                                        <AlertDialog>

                                                            <AlertDialogTrigger className="flex items-center">  <LucideTrash2 className='w-4 h-4 mr-3 ' />Delete Job</AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will permanently delete the selected job
                                                                        <span className="font-semibold text-black">{` ${job?.title} `}</span>
                                                                        from <span className="font-semibold text-black">{` ${job?.company?.name} company`}</span>.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(`${job._id}`)} > <LucideTrash2 className='w-4 h-4 font-extralight' />Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>


                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors duration-200"
                                                    >
                                                        <Eye className='w-4 h-4' />
                                                        View Applicants
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            < div className="md:hidden space-y-4" >
                {
                    allAdminJobs.length <= 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            You haven't created any jobs yet
                        </div>
                    ) : (
                        filterJobs?.map((job) => (


                            job?.company?.name == undefined ?

                                <div key={job._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200  text-lg text-gray-500 flex item-center justify-between">


                                    The user has deleted the company.

                                    <Popover>
                                        <PopoverTrigger >
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-2" >

                                            <button

                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                            >

                                                <AlertDialog >

                                                    <AlertDialogTrigger className="flex items-center">  <LucideTrash2 className='w-4 h-4 mr-3 ' />Delete Job</AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the selected job
                                                                <span className="font-semibold text-black">{` ${job?.title} `}</span>.                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(`${job._id}`)} > <LucideTrash2 className='w-4 h-4 font-extralight' />Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>


                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </div> :


                                <div key={job._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">


                                    <div className="space-y-3">
                                        {/* Header */}
                                        <div className={`flex items-start justify-between `}>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold  flex text-xl items-center gap-3"><Briefcase className='W-5 h-5 mt-2' /> {job?.title}</h3>
                                                <div className="flex items-center  mt-1 text-xl gap-3">
                                                    <Building2 className="w-5 h-5 mr-1" />
                                                    <span>{job?.company?.name}</span>
                                                </div>
                                            </div>

                                            <Popover>
                                                <PopoverTrigger >
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-2" >
                                                    <div className="space-y-1">
                                                        <button

                                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                                        >

                                                            <AlertDialog >

                                                                <AlertDialogTrigger className="flex items-center">  <LucideTrash2 className='w-4 h-4 mr-3 ' />Delete Job</AlertDialogTrigger>

                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This will permanently delete the selected job
                                                                            <span className="font-semibold text-black">{` ${job?.title} `}</span>
                                                                            from <span className="font-semibold text-black">{` ${job?.company?.name} company`}</span>.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleDelete(`${job._id}`)} > <LucideTrash2 className='w-4 h-4 font-extralight' />Continue</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>


                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors duration-200"
                                                        >
                                                            <Eye className='w-4 h-4' />
                                                            View Applicants
                                                        </button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        {/* Stats and Date */}
                                        <div className="flex items-center justify-between text-lg ">
                                            <Badge className={`${getStatusColor(job.application?.length || 0)} border-0 text-[16px] px-2 pb-1 `}>
                                                {job.application?.length || 0} applications
                                            </Badge>

                                            <div className="flex items-center text-gray-500 text-[15px] gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{job?.createdAt?.split("T")[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default AdminJobsTable