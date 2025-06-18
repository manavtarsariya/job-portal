import React, {  useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { setLoading, setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utills/constants'
import { Loader2 } from 'lucide-react'




const UpdateProfileDialog = ({ open, setOpen }) => {

    

    const { user,loading } = useSelector(store => store.auth);

    //  why "?"

    // If user is undefined or null, the entire expression evaluates to undefined instead of throwing an error.
    // If profile is undefined or null, it stops there and returns undefined.
    // If skills is undefined, it won't call .map() and avoids an error.


    const [input, setinput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });

    const changeHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })

    }

    const filechangeHandler = (e) => {
        const file = e.target.files?.[0];
        setinput({ ...input, file })
    }

    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        // profile photo chhe etle convert karvanu form data ma 
        // jyare pn profile photo like ave to tene formdata ma convert karvu pade
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }


        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {

                dispatch(setUser(res.data.user))
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
        setOpen(false);
        dispatch(setLoading(false));
    }

    return (
        <div>

            {/* why setopen coz onopenchange is a callback function , so setopen is kind of function that change the value of open . */}
            {/* jyare pan cross button par click thase and ouside par click thase or esc key par click , to internally setopen(false) call thai jashe and dialog box close thai jashe */}

            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center mt-3 font-medium">Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>

                        <div className='mt-3'>

                            <div className='grid grid-cols-4 gap-4'>
                                <Label htmlFor="name" className="">Full Name</Label>
                                <Input
                                    id="name"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeHandler}
                                    type="text"
                                    className="border-1 col-span-3"
                                />
                            </div>

                            <div className='grid grid-cols-4 gap-4 mt-3'>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeHandler}
                                    type="email"
                                    className="border-1 col-span-3" />
                            </div>

                            <div className='grid grid-cols-4 gap-4 mt-3'>
                                <Label htmlFor="name">Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeHandler}
                                    type="text"
                                    className="border-1 col-span-3" />
                            </div>

                            <div className='grid grid-cols-4 gap-4 mt-3'>
                                <Label htmlFor="name">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeHandler}
                                    type="text"
                                    className="border-1 col-span-3" />
                            </div>

                            <div className='grid grid-cols-4 gap-4 mt-3'>
                                <Label htmlFor="name">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeHandler}
                                    type="text"
                                    className="border-1 col-span-3" />
                            </div>

                            <div className='grid grid-cols-4 gap-4 mt-3'>
                                <Label htmlFor="name">Resume</Label>
                                <Input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={filechangeHandler}
                                    accept="application/pdf"
                                    className="border-1 col-span-3" />
                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='mt-4 w-full'> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button> : <Button type="submit"  className=" mt-4 w-full">Update</Button>
                            }
                            
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog