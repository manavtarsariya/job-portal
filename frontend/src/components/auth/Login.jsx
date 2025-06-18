import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


import axios from 'axios'
import { USER_API_END_POINT } from '@/utills/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
// import store from '@/redux/store'
// import useSelectore from '@/redux/store'



const Login = () => {
    const { user } = useSelector(store => store.auth);

    const [input, setinput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changehandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                // if(res.data.user.role === "recruiter"){
                //     navigate("/admin/companies")
                // }
                // else if(res.data.user.role === "student"){
                //     navigate("/");
                // }
                navigate("/");

                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [navigate, user])



    return (
        <div>
            <Navbar />
            <div className=' max-md:p-6 max-md:mt-10 md:max-w-7xl mx-auto flex items-center justify-center bg-amber-00 '>

                <form onSubmit={submitHandler} className='md:w-1/2 w-full  border border-gray-300 rounded-md p-4 my-10'>
                    <h1 className='font-bold md:text-3xl text-2xl text-center'> Log In</h1>

                    <div className='my-4'>
                        <Label htmlFor="" className="my-1">Email</Label>
                        <Input type="email"
                            name="email"
                            value={input.email}
                            onChange={changehandler}
                            placeholder='john123@gmail.com'
                        />
                    </div>

                    <div className='my-4'>
                        <Label htmlFor="" className="my-1">Password</Label>
                        <Input type="Password"
                            name="password"
                            value={input.password}
                            onChange={changehandler}
                            placeholder='Johndoe@6843'
                        />
                    </div>

                    <div className='flex items-center gap-4 mt-4 justify-center'>

                        <div className='my-2 flex items-center justify-between'>
                            <input type="radio" name="role" value="student"
                                id='student'
                                checked={input.role === 'student'}
                                onChange={changehandler}
                                className="cursor-pointer" />
                            <Label htmlFor="student" className="ml-2 cursor-pointer" >Student</Label>
                        </div>

                        <div className=' my-2 flex items-center justify-between'>

                            <input type="radio" name="role" value="recruiter"
                                id='reqruiter'
                                checked={input.role === 'recruiter'}
                                onChange={changehandler}
                                className=" cursor-pointer " />
                            <Label htmlFor="reqruiter" className="ml-2 cursor-pointer" >Recruiter</Label>
                        </div>

                    </div>

                    {
                        loading ? <Button className='mt-4 w-full'> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button> : <Button type="submit" className=" mt-4 w-full">Log In</Button>
                    }


                    <p className='mt-3 text-center'>Don't have an account?  <Link to="/signup" className='text-blue-600 font-bold'>Sign Up</Link></p>

                </form>
            </div>

        </div>
    )
}

export default Login
