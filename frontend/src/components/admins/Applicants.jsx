import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utills/constants'
import { setAllApplicants } from '@/redux/applicationSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { User, Users, FileText, Clock } from 'lucide-react'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, params.id])

    const applicantCount = applicants?.application?.length || 0;

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
            <Navbar />

            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-4">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <h1 className='text-2xl font-bold text-gray-800'>
                            Job Applicants
                        </h1>
                    </div>
                    
                    <div className="flex justify-center items-center gap-2 text-lg">
                        <span className="text-gray-600">Total Applicants:</span>
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-full font-bold shadow-md">
                            {applicantCount}
                        </span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                                <p className="text-2xl font-bold text-gray-900">{applicantCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <FileText className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">With Resume</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applicants?.application?.filter(app => app?.applicant?.profile?.resume).length || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Recent (7 days)</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applicants?.application?.filter(app => {
                                        const appDate = new Date(app.createdAt);
                                        const weekAgo = new Date();
                                        weekAgo.setDate(weekAgo.getDate() - 7);
                                        return appDate >= weekAgo;
                                    }).length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 md:px-8 md:py-8 px-4 py-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Applicant Management</h1>
                                <p className="text-indigo-100 mt-1 md:text-lg">
                                    Review and manage job applications with detailed candidate information
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="p-8">
                        {applicantCount === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    When candidates apply for this position, their applications will appear here for your review.
                                </p>
                            </div>
                        ) : (
                            <ApplicantsTable />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Applicants