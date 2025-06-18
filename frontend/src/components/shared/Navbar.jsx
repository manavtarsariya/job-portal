import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, MenuIcon, User2, X, Home, Briefcase, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utills/constants'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const { user } = useSelector(store => store.auth);
    const [temp2, settemp2] = useState(false)
    // const temp = false;
    const [size, setsize] = useState(false)

    useEffect(() => {
        const temp = window.matchMedia(`(max-width: 768px)`);

        const handleResize = () => {
            setsize(temp.matches);
            if (!temp.matches) {
                settemp2(false); // Close mobile menu when switching to desktop
            }
        };

        handleResize();
        temp.addEventListener('change', handleResize);

        return () => temp.removeEventListener('change', handleResize);
    }, [])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (temp2 && !event.target.closest('.mobile-menu-container')) {
                settemp2(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [temp2]);

    // icon: Icon renames the icon prop to Icon.
    // It allows you to use the Icon variable in JSX, treating it as a React component.
    // By writing icon: Icon, we're simply renaming the icon prop to Icon and treating it as a JSX component. This allows us to use Icon directly within the JSX.


    const NavLink = ({ to, children, icon: Icon, onClick }) => (
        <Link
            to={to}
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
        >

            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </Link>
    );
    // <MobileNavLink to="/admin/companies" icon={Briefcase}>Companies</MobileNavLink>
    // <MobileNavLink to="/jobs" icon={Search}>Jobs</MobileNavLink>

    const MobileNavLink = ({ to, children, icon: Icon, onClick }) => (
        <Link
            to={to}
            onClick={() => {
                settemp2(false);
                onClick = onClick();
            }}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border-b border-gray-100 last:border-b-0"
        >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </Link>
    );

    return (
        <nav className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 '>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16 px-4 lg:px-6'>
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-white" />
                        </div>
                        <h1 className='text-2xl font-bold text-gray-900'>
                            Job<span className='text-red-600'>Portal</span>
                        </h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                {!size && (
                    <div className='flex items-center gap-1'>
                        {user && user.role === "recruiter" ? (
                            <>
                                <NavLink to="/admin/companies" icon={Briefcase}>Companies</NavLink>
                                <NavLink to="/admin/jobs" icon={Search}>Jobs</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" icon={Home}>Home</NavLink>
                                <NavLink to="/jobs" icon={Search}>Jobs</NavLink>
                                <NavLink to="/browse" icon={Briefcase}>Browse</NavLink>
                            </>
                        )}
                    </div>
                )}

                {/* Right Side - Auth & Profile */}
                <div className="flex items-center gap-4">
                    {/* Desktop Auth Buttons */}
                    {!user && !size && (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200">
                                    Log In
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* User Profile Popover */}
                    {user && (
                        <Popover>
                            <PopoverTrigger >
                                <div className='cursor-pointer'>
                                    <Avatar className="h-10 w-10 ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-200">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" className="object-cover" />
                                    </Avatar>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0 shadow-xl border-0 rounded-xl overflow-hidden">
                                {/* Profile Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                                    <div className='flex items-center gap-3'>
                                        <Avatar className="h-12 w-12 ring-2 ring-white/20">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" className="object-cover"/>
                                        </Avatar>
                                        <div className="text-white">
                                            <h4 className='font-semibold text-lg'>{user?.fullName}</h4>
                                            <p className='text-blue-100 text-sm'>Welcome to Job Portal</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Actions */}
                                <div className='p-4 space-y-2'>
                                    {user && user.role === "student" && (
                                        <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-700 hover:text-blue-600">
                                            <User2 className="w-4 h-4" />
                                            <span className="font-medium">View Profile</span>
                                        </Link>
                                    )}

                                    <button
                                        onClick={logoutHandler}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors duration-200 text-gray-700 hover:text-red-600"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="font-medium">Log Out</span>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {/* Mobile Menu Button */}
                    {size && (
                        <div className="mobile-menu-container relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => settemp2(!temp2)}
                                className="p-2 hover:bg-gray-100 transition-colors duration-200 "
                            >
                                {temp2 ? (
                                    <X className='h-6 w-6 text-gray-700' />
                                ) : (
                                    <MenuIcon className='h-6 w-6 text-gray-700' />
                                )}
                            </Button>

                            {/* Mobile Menu Dropdown */}
                            {temp2 && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                                    {/* Navigation Links */}
                                    <div className="px-2 pb-2 border-b border-gray-100">
                                        {user && user.role === "recruiter" ? (
                                            <>
                                                <MobileNavLink to="/admin/companies" icon={Briefcase}>Companies</MobileNavLink>
                                                <MobileNavLink to="/admin/jobs" icon={Search}>Jobs</MobileNavLink>
                                            </>
                                        ) : (
                                            <>
                                                <MobileNavLink to="/" icon={Home}>Home</MobileNavLink>
                                                <MobileNavLink to="/jobs" icon={Search}>Jobs</MobileNavLink>
                                                <MobileNavLink to="/browse" icon={Briefcase}>Browse</MobileNavLink>
                                            </>
                                        )}
                                    </div>

                                    {/* Auth Links for Mobile */}
                                    {!user && (
                                        <div className="px-2 pt-2 space-y-1">
                                            <MobileNavLink to="/login" icon={User2}>Log In</MobileNavLink>
                                            <MobileNavLink to="/signup" icon={User2}>Sign Up</MobileNavLink>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar