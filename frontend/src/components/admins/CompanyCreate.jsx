import React, { useState } from 'react'
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utills/constants';
import { toast } from 'sonner';
import { setSingleCompany } from '@/redux/companySlice';
import { useDispatch } from 'react-redux';

const CompanyCreate = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setcompanyName] = useState()

    const registerNewCompany = async () => {

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyname: companyName },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials:true
                }
            );

            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="md:max-w-4xl mx-auto max-w-90 max-md:mt-20">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500 max-md:mt-4">
                        What would you like to give your company name ? You can change this later.
                    </p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    value={companyName}
                    onChange={(e)=> setcompanyName(e.target.value)}
                    placeholder="JobHunt, Microsoft etc."
                />

                <div className="flex items-center gap-2 my-10 ">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate