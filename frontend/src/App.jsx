
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Jobdetails from './components/Jobdetails'
import Companies from './components/admins/Companies'
import CompanySetup from './components/admins/CompanySetup'
import CompanyCreate from './components/admins/CompanyCreate'
import AdminJob from './components/admins/AdminJobs'
import PostJob from './components/admins/PostJob'
import Applicants from './components/admins/Applicants'
import ProtectedRoute from './components/admins/ProtectedRoute'
import ProtectedRouteUser from './components/ProtectedRouteUser'





const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/jobdetails/:id",
    element:
     <ProtectedRouteUser>
      <Jobdetails />
    </ProtectedRouteUser>
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: 
    <ProtectedRouteUser>
    <Profile />
    </ProtectedRouteUser>
  },

  // admins
  {
    path: "/admin/companies",
    element: 
    <ProtectedRoute> 
    <Companies />
    </ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element:
      <ProtectedRoute>  
      <CompanyCreate />
     </ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element:
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element:
      <ProtectedRoute>
        <AdminJob />
      </ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element:
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element:
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
  }
])


function App() {


  return (
    <>

      <RouterProvider router={approuter} />

      {/* <Navbar/> */}


    </>
  )
}

export default App
