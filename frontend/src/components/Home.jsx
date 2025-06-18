import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Herosection from './Herosection'
import CategoryCarousel from './CategoryCarousel'
import Latestjob from './Latestjob'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from './hooks/useGetAllJobs'

const Home = () => {

  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [navigate, user?.role]);






  return (
    <div>
      <Navbar />
      <Herosection />
      <CategoryCarousel />
      <Latestjob />
      <Footer />
    </div>
  )
}

export default Home
