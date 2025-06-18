import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { Navigate, useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../hooks/useGetAllCompanies';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { Building2, Plus, Search, TrendingUp, Calendar, Users, User2, LucideBuilding } from 'lucide-react';

const Companies = () => {
  const [filterWords, setfilterWords] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);

  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(filterWords))
  }, [dispatch, filterWords])

  const lastcreatedcompanyname = companies.length >= 0 && companies[(companies.length)-1]?.name || "NA";
  

  const companyCount = companies?.length || 0;
  const recentCompanies = companies?.filter(company => {
    const companyDate = new Date(company.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return companyDate >= weekAgo;
  }).length || 0;


  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}

        <div className="text-center mb-8 ">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className='text-2xl font-bold text-gray-800 '>
              Company Management
            </h1>
          </div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your registered companies and track their performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Companies</p>
                <p className="text-2xl font-bold text-gray-900">{companyCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <LucideBuilding className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Recently Created Company</p>
                <p className="text-xl font-bold text-gray-900">{lastcreatedcompanyname}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Added This Week</p>
                <p className="text-2xl font-bold text-gray-900">{recentCompanies}</p>
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
                className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                placeholder="Search companies by name..."
                value={filterWords}
                onChange={(e) => setfilterWords(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={() => navigate("/admin/companies/create")} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-12 px-6 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Company
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Registered Companies</h1>
                <p className="text-blue-100 mt-1 text-lg">
                  Manage and monitor your company portfolio
                </p>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="p-8">
            {companyCount === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Companies Registered</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Get started by registering your first company to begin posting jobs and managing applications.
                </p>
                <Button 
                  onClick={() => navigate("/admin/companies/create")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Register First Company
                </Button>
              </div>
            ) : (
              <CompaniesTable />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies