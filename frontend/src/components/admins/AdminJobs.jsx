import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs';
import {  setSearchJobByText } from '@/redux/jobSlice';
import { Briefcase, Plus, Search, TrendingUp, Calendar, Users } from 'lucide-react';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allAdminJobs } = useSelector(store => store.job);

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [dispatch, input]);

    const jobCount = allAdminJobs?.length || 0;
    const recentJobs = allAdminJobs?.filter(job => {
        const jobDate = new Date(job.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return jobDate >= weekAgo;
    }).length || 0;

    const totalApplications = allAdminJobs?.reduce((total, job) => {
        return total + (job.application?.length || 0);
    }, 0) || 0;

  



    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
            <Navbar />
            
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-4">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <h1 className='text-2xl font-bold text-gray-800'>
                            Job Management
                        </h1>
                    </div>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Manage your job postings and track application performance
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <Briefcase className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                                <p className="text-2xl font-bold text-gray-900">{jobCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                                <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Calendar className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Posted This Week</p>
                                <p className="text-2xl font-bold text-gray-900">{recentJobs}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                                placeholder="Search jobs by title, company..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        
                        <Button 
                            onClick={() => navigate("/admin/jobs/create")}
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-12 px-5 rounded-xl"
                        >
                            <Plus className="w-4 h-4 " />
                            Add New Job
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 px-8 py-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Posted Jobs</h1>
                                <p className="text-orange-100 mt-1 text-lg">
                                    Monitor and manage your job listings and applications
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="p-8">
                        {jobCount === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Briefcase className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">
                                    Start by creating your first job posting to attract qualified candidates.
                                </p>
                                <Button 
                                    onClick={() => navigate("/admin/jobs/create")}
                                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create First Job
                                </Button>
                            </div>
                        ) : (
                            <AdminJobsTable  />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminJobs