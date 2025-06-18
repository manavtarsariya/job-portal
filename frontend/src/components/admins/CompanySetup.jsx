import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utills/constants';
import { Textarea } from '../ui/textarea';
import { useSelector } from 'react-redux';
import useGetCompanyByid from '../hooks/useGetCompanyByid';


const CompanySetup = () => {
    const [loading, setloading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const {singleCompany} = useSelector((store)=> store.company)
    // const dispatch = useDispatch()

    
    const [input, setInput] = useState({

        name: "",
        description: "",
        website: "",
        location: "",
        file: null

    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }
        
        try {
            setloading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setloading(false)
        }
    }
useGetCompanyByid(params.id);
    useEffect(() => {
        setInput(
            {
                name: singleCompany?.name || "",
                description: singleCompany?.description || "",
                website: singleCompany?.website || "",
                location: singleCompany?.location || "",
                file: singleCompany?.file || null
            }
        )

    }, [singleCompany]);



    return (
        <div>
            <Navbar />
            <div className="md:max-w-2xl max-sm:w-95  max-md:bg-aber-600 mx-auto my-20 max-sm:mt-25 max-md:p-10 border shadow-2xl rounded-2xl md:p-10 ">
                <form onSubmit={submitHandler} >
                    <div className=" items-center pb-8 max-w-xl">

                        <h1 className="font-bold text-2xl text-whit w-full text-center pb-10 ">Company Setup</h1>
                        <hr className='mt- ' />
                    </div>

                    <div className="grid  gap-3 md:gap-4 -ml-3 ">
                        <div className='flex'>
                            <Label className=" md:w-40 max-sm:mr-5 ">Company Name</Label>
                            <Input
                                className="mt-2 border rounded  w-full shadow focus:shadow-lg focus:outline-none transition-shadow"
                                type="text"
                                name="name"
                                placeholder=" e.g. Microsoft, Google ..."
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex md:w-xl max-sm:w-80 '>
                            <Label className=" md:w-40 max-md:mr-4">Description</Label>
                            <Textarea
                                type="text"
                                className="mt-2 p-2 h-25 max-md:ml md:max-w-full   "
                                name="description"
                                placeholder="Add a Description ..."
                                value={input.description}
                                onChange={changeEventHandler}
                            />

                        </div>
                        <div className='flex'>
                            <Label className={`md:w-40  max-md:mr-9` }>Website</Label>
                            <Input
                                type="text mt-2"
                                name="website"
                                value={input.website}
                                placeholder="Please Enter Your Website URL"
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex'>
                            <Label className={`md:w-40  max-md:mr-8`}>Location</Label>
                            <Input
                                className="mt-"
                                type="text"
                                name="location"
                                placeholder="Please Enter a Location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex '>
                            <Label className={`md:w-40  max-md:mr-13`}>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className='mt-7 w-full '> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button> : <Button type="submit" className=" mt-7 w-full">Update</Button>
                    }
                </form>

                    <div className='flex justify-center'>
                        <button onClick={() => navigate("/admin/companies")} className='text-sm text-gray-500 cursor-pointer mt-2 font-semibold hover:underline'>Back to Main Page?</button>
                    </div>
            </div>
        </div>
    );
}

export default CompanySetup






// All hooks are called during render (initialization).
// Their logic executes at different times:
// useState/useMemo → During render.
// useEffect → After render.
// Custom hooks → Depends on their internal hooks.