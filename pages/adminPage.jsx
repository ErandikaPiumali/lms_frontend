import { FaBook, FaCashRegister, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-screen  flex">
            <div className="w-[300px] h-full flex flex-col items-center bg-gray-100">
                <span className="text-3xl font-bold my-5">Admin Panel</span> 

                <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]" to="/admin/dashboard"><MdDashboard /> Dashboard</Link>
                
                  <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]" to="/admin/users"><FaUser />Users</Link>
                   <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]"  to="/admin/courses"><FaBook />Courses</Link>
                   <Link className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl gap-[25px]" to="/admin/payments"><FaCashRegister />Payments</Link>
                 </div>

            <div  className="w-[calc(100%-300px)] h-full">
                <Routes path="/*">
                <Route path="/" element ={<h1>AdminDashboard</h1>}/>
              
                  <Route path="/users" element={<h1>Users</h1>}/>
                   <Route path="/courses" element={<h1>Courses</h1>}/>
                  <Route path="/payments" element={<h1>Payments</h1>}/>
                  

                </Routes>
            </div>
        </div>
    )
}