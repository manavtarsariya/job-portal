import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2, Calendar, ExternalLink, LucideTrash2, Building } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
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
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utills/constants'
import { toast } from 'sonner'
import { setCompanies } from '@/redux/companySlice'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filtercompany, setfiltercompany] = useState(companies)
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setfiltercompany(filteredCompany);
    }, [companies, searchCompanyByText])

    const getInitials = (name) => {
        return name ? name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) : 'CO';
    };


    const dispatch = useDispatch()


    const handleDelete = async (companyId) => {


        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/removecompany/${companyId}`, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setCompanies(res.data.companies))
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.error("Error deleting company:", error);
        }

    }

    return (
        <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden md:block">
                <Table>
                    {companies.length <= 0 ? (
                        <TableCaption className="py-8 text-gray-500">
                            You haven't registered any company yet
                        </TableCaption>
                    ) : (
                        <TableCaption className="py-4 text-sm text-gray-500">
                            A list of your registered companies
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
                            <TableHead className="text-center font-semibold text-gray-700">Company Name</TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">
                                <div className="flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Date Created
                                </div>
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filtercompany?.map((company) => (
                            <TableRow key={company._id} className="border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                <TableCell className="py6">
                                    <div className="flex justify-center">
                                        <div className="relative group">
                                            <Avatar className="h-12 w-12 rounded-md">
                                                <AvatarImage src={company?.logo} className="object-cover" />
                                                {
                                                    !company?.logo && (

                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center text-white font-semibold">
                                                            {!company?.logo && getInitials(company.name)}
                                                        </div>
                                                    )
                                                }
                                            </Avatar>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="font-semibold text-gray-900 text-[16px]">{company.name}</div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="text-gray-600">{company.createdAt.split("T")[0]}</div>
                                </TableCell>

                                <TableCell className="text-center">
                                    <Popover>
                                        <PopoverTrigger >
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-2" align="start">


                                            <button

                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                            >

                                                <AlertDialog>

                                                    <AlertDialogTrigger className="flex items-center">  <LucideTrash2 className='w-4 h-4 mr-3 ' />Delete Company</AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the selected Company
                                                                <span className="font-semibold text-black">{` ${company?.name} `}</span>
                                                                {/* from <span className="font-semibold text-black">{` ${job?.company?.name} company`}</span>. */}
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(`${company._id}`)} > <LucideTrash2 className='w-4 h-4 ' />Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>


                                            </button>


                                            <button
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                            >
                                                <Edit2 className='w-4 h-4' />
                                                Edit Company
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {companies.length <= 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        You haven't registered any company yet
                    </div>
                ) : (
                    filtercompany?.map((company) => (
                        <div key={company._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center gap-4">

                                <div className="relative">
                                    <Avatar className="h-14 w-14 rounded-md">
                                        <AvatarImage src={company?.logo} className="object-cover" />
                                        {
                                            !company?.logo && (

                                                <div className="absolute rounded-md inset-0 bg-gradient-to-r from-blue-500 to-purple-500  flex items-center justify-center text-white font-semibold">
                                                    {!company?.logo && getInitials(company.name)}
                                                </div>
                                            )
                                        }
                                    </Avatar>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 truncate text-[17px] flex items-center gap-2"><Building className='w-5 h-5'/>{company?.name}</h3>
                                    <div className="flex items-center gap-1 text-[15px] text-gray-600 mt-1">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{company.createdAt.split("T")[0]}</span>
                                    </div>
                                </div>

                                <Popover>
                                    <PopoverTrigger >
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-44 p-2" >
                                        <button

                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                        >

                                            <AlertDialog>

                                                <AlertDialogTrigger className="flex items-center">  <LucideTrash2 className='w-4 h-4 mr-3 ' />Delete Company</AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete the selected Company
                                                            <span className="font-semibold text-black">{` ${company?.name} `}</span>
                                                            {/* from <span className="font-semibold text-black">{` ${job?.company?.name} company`}</span>. */}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(`${company._id}`)} > <LucideTrash2 className='w-4 h-4 ' />Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </button>

                                        <button
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                        >
                                            <Edit2 className='w-4 h-4' />
                                            Edit Company
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CompaniesTable