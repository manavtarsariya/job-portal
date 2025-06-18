import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Download, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from './hooks/useGetAppliedJobs';


const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Hero Profile Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
                    {/* Header Background */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
                    </div>

                    {/* Profile Content */}
                    <div className="relative px-8 pb-8">
                        {/* Avatar */}
                        <div className="absolute -top-16 left-10">
                            <div >

                                <Avatar className="h-34 w-34 border-4 border-white shadow-2xl  hover:scale-110 transition-transform ease-out duration-500 cursor-pointer">
                                    <AvatarImage className="object-cover" src={user?.profile?.profilePhoto} />
                                </Avatar>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div className="flex justify-end pt-4">
                            <Button
                                onClick={() => setOpen(true)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-102 cursor-pointer p-5"
                                size="sm"
                            >
                                <Pen className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        </div>

                        {/* Profile Info */}
                        <div className="mt-12 space-y-6">
                            {/* Name and Bio */}
                            <div className="space-y-3">
                                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{user?.fullName}</h1>
                                <p className=" text-gray-600 leading-relaxed max-w-3xl">{user?.profile?.bio}</p>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-gray-900 font-medium">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <Contact className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Phone No.</p>
                                        <p className="text-gray-900 font-medium">{user?.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Briefcase className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {user?.profile?.skills.length !== 0 ?
                                        user?.profile?.skills.map((item, index) => (
                                            <Badge
                                                key={index}
                                                className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-400 transform hover:-translate-y-0.5"
                                            >
                                                {item}
                                            </Badge>
                                        )) :
                                        <div className="text-gray-500 italic bg-gray-100 px-4 py-2 rounded-lg">
                                            No skills added yet
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* Resume Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Download className="w-4 h-3 text-orange-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Resume</h2>
                                </div>

                                <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                                    {user?.profile?.resume ? (
                                        <a
                                            target="_blank"
                                            href={user?.profile?.resume}
                                            className="flex items-center gap-3 text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors duration-200"
                                        >
                                            <Download className="w-5 h-5" />
                                            <span className="">{user?.profile?.resumeOriginalName}</span>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <Download className="w-5 h-5" />
                                            <span>No resume uploaded </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-400 to-pink-300 px-8 py-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Applied Jobs</h1>
                        </div>
                        <p className="text-white mt-2">Track your job applications and their status</p>
                    </div>

                    <div className="p-8">
                        <AppliedJobTable />
                    </div>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile