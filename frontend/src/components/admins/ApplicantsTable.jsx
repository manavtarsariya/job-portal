import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { HandshakeIcon, MoreHorizontal, XCircle, Download, Mail, Phone, Calendar, FileText, CheckCircle } from 'lucide-react';
import { APPLICATION_API_END_POINT } from '@/utills/constants';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const ApplicantsTable = () => {
    const array = ["Accept", "Reject"];
    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (status, id) => {
        try {
            status = (status + "ed");
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(()=>{

    },[applicants?.application])

    const getStatusBadge = (status) => {
        switch (status) {
            case 'accepted':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        Accepted
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3" />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Calendar className="w-3 h-3" />
                        Pending
                    </span>
                );
        }
    };

    return (
        <div className="overflow-hidden">

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {applicants && applicants?.application?.map((appli) => (
                    <div key={appli._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900">{appli?.applicant?.fullName}</h3>
                                <div className="mt-1">
                                    {getStatusBadge(appli?.status)}
                                </div>
                            </div>
                            <Popover>
                                <PopoverTrigger className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                </PopoverTrigger>
                                <PopoverContent className="w-fit px-2 py-2">
                                    {array.map((status, index) => (
                                        <div 
                                            onClick={() => statusHandler(status, appli._id)} 
                                            key={index} 
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200'
                                        >
                                            {index === 0 ? (
                                                <HandshakeIcon className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-600" />
                                            )}
                                            <span className="text-sm font-medium">{status}</span>
                                        </div>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span>{appli?.applicant?.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{appli?.applicant?.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>Applied: {appli?.createdAt?.split("T")[0]}</span>
                            </div>
                            {appli?.applicant?.profile?.resume && (
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <a 
                                        target="_blank" 
                                        href={appli?.applicant?.profile.resume} 
                                        className='text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium'
                                    >
                                        {appli?.applicant?.profile.resumeOriginalName}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
                <Table className="w-full">
                    {applicants?.application?.length <= 0 ? (
                        <TableCaption className="mt-8 text-gray-500">
                            No applications received yet.
                        </TableCaption>
                    ) : (
                        <TableCaption className="text-sm text-gray-500 mt-4">
                            Showing {applicants?.application?.length} recent applications
                        </TableCaption>
                    )}

                    <TableHeader>
                        <TableRow className="border-gray-200 hover:bg-gray-50">
                            <TableHead className="text-left font-semibold text-gray-900 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    Candidate
                                </div>
                            </TableHead>
                            <TableHead className="text-left font-semibold text-gray-900">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </div>
                            </TableHead>
                            <TableHead className="text-left font-semibold text-gray-900">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Contact
                                </div>
                            </TableHead>
                            <TableHead className="text-left font-semibold text-gray-900">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Resume
                                </div>
                            </TableHead>
                            <TableHead className="text-left font-semibold text-gray-900">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Applied Date
                                </div>
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-900">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-900">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applicants && applicants?.application?.map((appli) => (
                            <TableRow key={appli._id} className="border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                            {appli?.applicant?.fullName?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{appli?.applicant?.fullName}</p>
                                            <p className="text-sm text-gray-500">Candidate</p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        {appli?.applicant?.email}
                                    </div>
                                </TableCell>

                                <TableCell className="text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        {appli?.applicant?.phoneNumber}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {appli?.applicant?.profile.resume ? (
                                        <a 
                                            target="_blank" 
                                            href={appli?.applicant?.profile.resume} 
                                            className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200'
                                        >
                                            <Download className="w-4 h-4" />
                                            <span className="truncate max-w-32">
                                                {appli?.applicant?.profile.resumeOriginalName}
                                            </span>
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 italic">No resume</span>
                                    )}
                                </TableCell>

                                <TableCell className="text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {appli?.createdAt?.split("T")[0]}
                                    </div>
                                </TableCell>

                                <TableCell className="text-center">
                                    {getStatusBadge(appli?.status)}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-fit px-2 py-2 shadow-xl border border-gray-200">
                                            {array.map((status, index) => (
                                                <div 
                                                    onClick={() => statusHandler(status, appli._id)} 
                                                    key={index} 
                                                    className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 group'
                                                >
                                                    {index === 0 ? (
                                                        <HandshakeIcon className="w-4 h-4 text-green-600 group-hover:text-green-700" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                                                    )}
                                                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                                        {status}
                                                    </span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ApplicantsTable