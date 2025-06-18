import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { Briefcase, Building, Building2, Calendar, CheckCircle, Clock, MoreHorizontal, Plus, TrendingUpDown, XCircle } from 'lucide-react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const AppliedJobTable = () => {

    const { allApliedJobs } = useSelector(store => store.job)
    const navigate = useNavigate();

    return (
        <div>
            {/* desktop view card */}
            <div className='hidden md:block'>
                <Table>
                    {
                        allApliedJobs?.length == 0 ?
                            <TableCaption className="mb-5">
                                <div className="text-center  text-gray-500 py-5">
                                    <Briefcase className='w-17 h-17 items-center justify-center mx-auto text-blue-500 ' />
                                    It looks like you haven't applied for any jobs so far.
                                    <br />
                                    <Button onClick={()=> navigate("/jobs")} className="bg-blue-200 text-blue-600 mt-5 item-center justify-center p-2  border border-blue-500 font-bold" variant="outline"><Plus className='mt-1' /> Apply Job </Button>
                                </div>
                            </TableCaption>
                            :
                            <TableCaption className="mb-5">A list of your applied jobs.</TableCaption>
                    }

                    <TableHeader>
                        <TableRow>
                            <TableHead className={`font-bold w-1/4 text-center`}>Date</TableHead>
                            <TableHead className={`font-bold w-1/4 text-center`}>Job Role</TableHead>
                            <TableHead className={`font-bold w-1/4 text-center`}>Company</TableHead>
                            <TableHead className=" text-right font-bold w-1/4"><div className='mr-8'>Status</div></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allApliedJobs.length >= 0 &&
                            allApliedJobs.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{item?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-center">{item?.job?.title}</TableCell>
                                    <TableCell className="text-center">{item?.job?.company?.name}</TableCell>
                                    <TableCell className="text-right ">
                                        <Badge className={`py-1 px-5 w-25
                                        ${item?.status === "pending" ? "bg-gray-700" : item?.status === "rejected" ? "bg-red-700" : "bg-green-700"}`}>
                                            {item?.status.toUpperCase()}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className='md:hidden block'>
                {allApliedJobs?.length <= 0 ? (
                    <div className="text-center py- text-gray-500 text-xl">
                        <Briefcase className='w-20 h-20 items-center justify-center mx-auto text-blue-500 ' />
                        It looks like you haven't applied for any jobs so far.
                        <br />
                        <Button onClick={()=> navigate("/jobs")} className="bg-blue-200 text-blue-600 mt-5 text-[16px] item-center justify-center w-1/2 p-6 text-lg border border-blue-500 font-bold" variant="outline"><Plus className='mt-1' /> Apply Job </Button>
                    </div>
                ) : (
                    allApliedJobs?.map((item) => (

                        <div key={item._id} className="bg-white border flex  justify-between border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 mb-5 ">

                            <div className=" ">

                                <div className="flex-1 min-w-0 mb-2">
                                    <div className="flex items-center gap-1 text-sm text-gray-700 font-semibold">

                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{item.createdAt.split("T")[0]}</span>

                                    </div>
                                </div>

                                <div className="flex items-center gap-3 min-w-0">
                                    <div className='flex items-center bg-amber-00 text-xl font-semibold'>

                                        <Building className="w-4 h-4 mr-3" />
                                        <span>{item?.job?.company?.name}</span>

                                    </div>
                                </div>

                                <div className="flex items-center min-w-0 font-semibold">
                                    <div className="flex items-center gap-1 text-s text-lg  ">

                                        <Briefcase className="w-4 h-4 mr-2" />
                                        <span>{item?.job?.title}</span>

                                    </div>
                                </div>

                            </div>

                            <div className='mt-2'>

                                <span className={`flex flex-col justify-center  text-sm items-center  font-semibold italic ${item?.status === "pending" ? "text-gray-500 " : item?.status === "rejected" ? "text-red-500" : "text-green-500"}`}>

                                    {

                                        item?.status === "pending" ?
                                            <Clock className="w-[16px] h-[16px]" /> :

                                            item?.status === "rejected" ?
                                                <XCircle className="w-[17px] h-[17px]" /> :

                                                <CheckCircle className="w-[16px] h-[16px]" />
                                    }

                                    {item?.status.toUpperCase()}
                                </span>

                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
}

export default AppliedJobTable