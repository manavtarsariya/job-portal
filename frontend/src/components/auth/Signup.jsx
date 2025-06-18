import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utills/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setinput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })


    const changehandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    const changefilehandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        // profile photo chhe etle convert karya form data ma 
        // jyare pn profile photo like ave to tene formdata ma convert karvu pade
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [navigate, user])

    return (
        <div>
            <Navbar />

            <div className=' md:max-w-7xl  mx-auto flex items-center justify-center '>
                <form onSubmit={submitHandler} className='md:w-1/2  max-md:m-5 max-md:mt-15  border border-gray-300 rounded-md p-5 my-10'>
                    <h1 className='font-bold text-3xl text-center'> Sign Up</h1>

                    <div className='my-4 mt-5'>
                        <Label htmlFor="" className="my-1">FullName</Label>
                        <Input type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange={changehandler}
                            placeholder='John doe'
                        />
                    </div>

                    <div className='my-4'>
                        <Label htmlFor="" className="my-1">Email</Label>
                        <Input type="email"
                            value={input.email}
                            name="email"
                            onChange={changehandler}
                            placeholder='john123@gmail.com'
                        />
                    </div>
                    <div className='my-4'>
                        <Label htmlFor="" className="my-1">Phone Number</Label>
                        <Input type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changehandler}
                            placeholder='0123456789'
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

                    <div className='flex items-center gap-4 mt-4'>



                        <div className='flex max-md:grid max-md:grid-cols-2'>



                            <div className='my-2 mr-5' >

                                <div className='flex max-md:gap-2  max-md:justify-center '>

                                    <input type="radio" name="role" value="student"
                                        id='student'
                                        checked={input.role === 'student'}
                                        onChange={changehandler}
                                        className="cursor-pointer" />
                                    <Label htmlFor="student" className="md:ml-2 cursor-pointer" >Student</Label>
                                </div>
                            </div>


                            <div className=' my-2 '>
                                <div className='flex max-md:gap-2 max-md:justify-center'>

                                    <input type="radio" name="role" value="recruiter"
                                        id='reqruiter'
                                        checked={input.role === 'recruiter'}
                                        onChange={changehandler}
                                        className=" cursor-pointer " />
                                    <Label htmlFor="reqruiter" className="md:ml-2 cursor-pointer" >Recruiter</Label>
                                </div>
                            </div>

                            <div className='flex items-center gap-2 md:ml-28 max-md:col-span-2 max-md:mt-5 '>
                                <Label >Profile <span className='text-red-600 text-xl -ml-1 '> *</span></Label>
                                <Input type="file" accept="image/*"
                                    onChange={changefilehandler}
                                    className="cursor-pointer hover:bg-gray-50 " />

                            </div>
                        </div>
                    </div>

                    {
                        loading ? <Button className='mt-4 w-full'> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button> : <Button type="submit" className={` mt-4 w-full `} disabled={input?.file?.name == undefined}>Sign up</Button>
                    }


                    <p className='mt-3 text-center'>Do you already have an account? <Link to="/login" className='text-blue-600 font-bold '>Log In</Link></p>

                </form>
            </div>

        </div>
    )
}

export default Signup
