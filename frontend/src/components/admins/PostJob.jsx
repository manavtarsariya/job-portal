import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utills/constants'
import { setLoading } from '@/redux/authSlice'
import { toast } from 'sonner'




const PostJob = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    // const [loading, setLoading] = useState(second)


    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 1,
        companyId: ""

    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) => {
        // const selectedcompany = companies?.find((company)=> company.name.toLowerCase() === value)
        setInput({ ...input, companyId: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs")

            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        } finally {

            dispatch(setLoading(false));
        }
    }

    const { companies } = useSelector(store => store.company);

    return (
        <div>
            <Navbar />
            <div className='border-1 max-sm:p-9 p-12 w-fit mx-auto rounded-3xl shadow-2xl my-10 max-sm:mt-20'>

                <div className='md:max-w-xl mx-auto max-sm:w-75'>
                    <form onSubmit={submitHandler} className=''>

                        <div className=" items-center gap-5 pb-8">

                            <h1 className="font-bold text-xl text-whit w-full text-center ">Add Job Details</h1>
                            <hr className='mt-3 ' />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className='md:flex'>
                                <Label htmlFor="title" className=" md:w-40 ">Title</Label>
                                <Input
                                    className="mt-2 p-2 border rounded md:w-full shadow focus:shadow-lg focus:outline-none transition-shadow"
                                    type="text"
                                    name="title"
                                    placeholder=" e.g. Fullstack Developer, Ui/Ux designer etc..."
                                    value={input.title}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div className='md:flex md:w-xl max-sm:w-80 '>
                                <Label htmlFor="description" className=" md:w-40">Description</Label>
                                <Textarea
                                    type="text"
                                    className="mt-2 p-2 h-25 max-sm:w-75 md:max-w-full border rounded md:w-full shadow focus:shadow-lg focus:outline-none transition-shadow   "
                                    name="description"
                                    placeholder="Add a Description ..."
                                    value={input.description}
                                    onChange={changeEventHandler}
                                />

                            </div>
                            <div className='md:flex w-xl max-sm:w-80'>
                                <Label htmlFor="requirements" className="w-40">Requirements</Label>
                                <Textarea
                                    className="max-sm:mt-2 p-2 h-17 max-sm:w-75  border rounded w-full shadow focus:shadow-lg focus:outline-none transition-shadow"
                                    type="text"
                                    name="requirements"
                                    placeholder="Please Enter Requirements "
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div className='md:flex'>
                                <Label htmlFor="salary" className={`w-40`}>Salary</Label>
                                <Input
                                    className="max-sm:mt-2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    type="number"
                                    min="0"
                                    name="salary"
                                    placeholder="Please Enter a Salary (in LPA)"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='md:flex'>
                                <Label htmlFor="location" className={`w-40`}>Location</Label>
                                <Input
                                    className="max-sm:mt-2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    type="text"
                                    name="location"
                                    placeholder="Please Enter a Location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='md:flex'>
                                <Label htmlFor="jobType" className={`w-40`}>JobType</Label>
                                <Input
                                    className="max-sm:mt-2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    type="text"
                                    name="jobType"
                                    placeholder="eg. Full Time , Part Time"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='md:flex'>
                                <Label htmlFor="experience" className={`w-40`}>Experience Level</Label>
                                <Input
                                    className="max-sm:mt-2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                   type="number"
                                    min="0"
                                    name="experience"
                                    placeholder="Please Enter The Experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='md:flex'>
                                <Label htmlFor="position" className={`w-40 `}> No of Position</Label>
                                <Input
                                    className="max-sm:mt-2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    type="number"
                                    min="1"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                />
                            </div>


                            {companies?.length > 0 && (
                                <div className='md:flex'>

                                    <Label className="w-40 max-sm:mb-2 ">Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                companies?.map((company) => {

                                                    return <SelectItem key={company._id} value={company?._id}>{company?.name}</SelectItem>
                                                }
                                                )
                                            }

                                        </SelectContent>
                                    </Select>
                                </div>)
                            }
                        </div>


                        {
                            companies.length != 0 && (
                                loading ? (
                                    <Button className="mt-7 w-full">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="mt-7 w-full">
                                        Post A New Job
                                    </Button>
                                )
                            )
                        }
                    </form>


                    {
                        companies.length === 0 &&
                        (
                            <Button
                                className="mt-7 w-full"
                                onClick={() => navigate("/admin/companies")}
                            >
                                Back to Main Page
                            </Button>
                        )
                    }

                    {
                        companies.length === 0 ? <div className='text-sm mt-3 text-center font-medium text-red-700'>* Oops! It looks like the company isn't registered yet. Please register it to continue.</div> : null
                    }


                    {
                        companies.length != 0 && <div className='flex justify-center'>
                            <button onClick={() => navigate("/admin/jobs")} className='text-sm text-gray-500 cursor-pointer mt-2 font-semibold hover:underline'>Back to Previous Page?</button>
                        </div>
                    }



                </div>
            </div>
        </div >
    )
}

export default PostJob