import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setFilterjobQuery } from '@/redux/jobSlice'


const FilterData = [
    {
        filterType: "Location",
        array: ["Gujarat", "Bangalore", "Hydrabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Job Type",
        array: ["Part Time", "Full Time"]
    },
    {
        filterType: "Salary",
        array: ["1", "3", "5", "7","9.9", "10"]
    }
]



const FilterCard = () => {
    const [selectedvalue, setSelectedvalue] = useState("")
    const dispatch = useDispatch();

    const onChangeHandler = (value) => {
        setSelectedvalue(value)

    }

    useEffect(() => {
        dispatch(setFilterjobQuery(selectedvalue));
    }, [dispatch, selectedvalue])

    

    return (
        <div className='w-full bg-whie p-3 rounded-md '>
            {/* <h1 className='font-bold text-lg'>Filter Jobs</h1> */}
            <hr className='mb-2 ' />
            <RadioGroup value={selectedvalue} onValueChange={onChangeHandler}>
                {
                    FilterData.map((data, index) => (
                        <div key={`filter-${data._id || index}`}> {/* Ensuring a unique key for outer loop */}
                            <h1 className="font-bold text-lg text-slate-500 hover:-translate-y-0.5 transition-transform ease-in-out duration-300 cursor-default">{data.filterType}</h1>

                            {
                                data.array.map((item, idx) => {
                                    const uniqueKey = `filter-${data._id || index}-${idx}`; // Generate a unique key
                                    return (
                                        <div className="flex items-center space-x-2 my-2 hover:scale-110 transition-transform ease-in-out duration-350 " key={uniqueKey}>
                                            <RadioGroupItem value={item} id={uniqueKey} className=" cursor]-pointer "/> {/* Match `id` with key */}
                                            <Label htmlFor={uniqueKey} className=" cursor-pointer ">
                                                {

                                                    data.filterType === "Salary" && idx == 5 ? (`>= ` + item + ` LPA`) : data.filterType === "Salary" && idx != 5 ? (`<= ` + item + ` LPA`) : item

                                                }
                                            </Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))

                }

            </RadioGroup>
        </div>
    )
}

export default FilterCard