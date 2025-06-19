import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsearchedQuery } from '@/redux/jobSlice';
// import { toast } from 'sonner';

const CategoryCarousel = () => {


    // const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();




    const searchHandler = (Query) => {
        // if (user == null) {
        //     toast.success("Please Log in or Sign up")
        //     return;
        // }
        dispatch(setsearchedQuery(Query));
        navigate("/browse");
    }


    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphics Designer",
        "Full Stack Developer",
        "DevOps Engineer",
        "Data Analytics",
        "UI/UX Designer",
        "Game Developer",
        "Blockchain Developer"
    ];
    return (
        <div>
            <Carousel className=" max-md:max-w-70  max-w-xl mx-auto flex flex-col ">
                <div>

                    <CarouselPrevious />
                </div>
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 basis-2/3  bg-mber-600" key={index}>
                            <Button onClick={() => searchHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <div>
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    );
}

export default CategoryCarousel