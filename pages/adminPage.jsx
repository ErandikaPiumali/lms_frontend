import { FaBook, FaCashRegister, FaUser } from "react-icons/fa";

import { MdDashboard } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/adminDashboard";
import { Outlet } from "react-router-dom";
import UsersAdminPage from "./admin/usersAdminPage";
import AddUsersAdminPage from "./admin/addUsersAdminPage";




export default function AdminPage(){
    return(
       <div className="w-full min-h-screen flex">
            <div className="w-[300px] min-h-screen flex flex-col items-center bg-gray-100">
                <span className="text-3xl font-bold my-5">Profile Details</span> 

                <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]" to="dashboard"><MdDashboard />Admin Dashboard </Link>
                
                  <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]" to="users"><FaUser />Users</Link>
                   <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]"  to="courses"><FaBook />Courses</Link>
                   <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]" to="payments"><FaCashRegister />Payments</Link>
                 </div>

           <div className="flex-1 min-h-screen">

          
       <Routes>
               <Route path="/admin" element={<AdminDashboard/>}/>
                 <Route index element={<AdminDashboard />} />
             <Route path="/dashboard" element ={<AdminDashboard />} />
                  <Route path="/courses" element ={<h1>Courses</h1>}/>
                  <Route path="/users" element={<UsersAdminPage/>}/>
                  <Route path="users/newUser" element={<AddUsersAdminPage/>}/>
                  <Route path="/payments" element={<h1>Payments</h1>}/>
                
                  

                </Routes>
              <Outlet/>
            </div>
        </div>
    )
}