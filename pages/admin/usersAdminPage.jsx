import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  BiEdit,BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loader from "../../src/components/loader";



export default function UsersAdminPage(){
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilter] = useState({
    userId:"", role:"", isBlocked:false
  });
const navigate = useNavigate();
  
const fetchUsers = () => {
  const token = localStorage.getItem("token");

  const params = {};

  if (filters.userId) params.userId = filters.userId;
  if (filters.role) params.role = filters.role;
  if (filters.isBlocked !== true) params.isBlocked = filters.isBlocked;

  axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params
  })
  .then((res) => {
    setUsers(res.data);
    setIsLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    toast.error("Failed to load users");
    setIsLoading(false);
  });
};  
useEffect(() => {

  const token = localStorage.getItem("token");

  if (token == null) {
    navigate("/login");
    return;
  }

 fetchUsers();
}, []);
 

    return(
    
      <div className="w-full h-full flex flex-col p-6 bg-gray-100 ">

       <div className="mb-6">
        <div className=" text-xl font-bold text-gray-800">User management</div>
        <p className="text-gray-500">View, add, and manage system users</p>
        
      </div>
     

       <div className="mb-6 flex justify-between items-center ">
       <button
       onClick={()=>navigate ("/admin/users/newUser")}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-2xl">
        Add new user
       </button>

       <div className="flex gap-3">
        <input type="text"
        placeholder="User Id"
        value={filters.userId}
        onChange={(e)=>
          setFilter({...filters, userId:e.target.value})
        }
        className="border px-3 py-2 rounded"/>
 <select
    value={filters.role}
    onChange={(e) =>
      setFilter({ ...filters, role: e.target.value })
    }
    className="border px-3 py-2 rounded"
  >
    <option value="">All Roles</option>
    <option value="Student">Student</option>
    <option value="Admin">Admin</option>
    <option value="Teacher">Teacher</option>
  </select>

   <select
    value={filters.isBlocked}
    onChange={(e) =>
      setFilter({ ...filters, isBlocked: e.target.value })
    }
    className="border px-3 py-2 rounded"
  >
    <option value="">All</option>
    <option value="true">Blocked</option>
    <option value="false">Active</option>
  </select>
       
       <button
    onClick={() => {
      setIsLoading(true);
      fetchUsers();
    }}
    className="border px-4 py-2 rounded"
  >
    Filter
  </button>

  <button
    onClick={() => {
      setFilter({ userId: "", role: "", isBlocked: "" });
      setIsLoading(true);
      setTimeout(fetchUsers, 0);
    }}
    className="border px-4 py-2 rounded"
  >
    Reset
  </button>

</div>
</div>


      <div className="flex-1 w-full border border-gray-500 rounded bg-white overflow-auto">

{/*Table*/}
<div className = "w-full h-full border-[3px] ">
    {isLoading?<Loader/>: <table>
  <thead>
    <tr>
       <th className="p-[10px]"> Profile Image</th>
      <th className="p-[10px]"> UserId</th>
       <th className="p-[10px]"> First Name</th>
      <th className="p-[10px]"> Last Name</th>
      <th className="p-[10px]"> Gender</th>
      <th className="p-[10px]"> Phone Number</th>
      <th className="p-[10px]"> Email</th>
    <th className="p-[10px]"> Role</th>
   <th className="p-[10px]"> Notifications</th>
  <th className="p-[10px]"> Grade</th>
   <th className="p-[10px]"> Guardian Type</th>
  <th className="p-[10px]"> Guardian Name</th>
 <th className="p-[10px]"> Guardian Phone No</th>
  <th className="p-[10px]"> Address</th>
   <th className="p-[10px]"> Status</th>
  
   <th className="p-[10px]"> Action</th>

    </tr>
  </thead>
  <tbody>
  
    {
      users.map(
        (User, index)=>{
          
        
         return(
        
            <tr key={index}>
                 <td>
              <img src={User.profilePic || "/default.png"} className="w-[50px] h-[50px]"/>
                </td>
              <td className = "p-[10px]"> {User.userId} </td>
               <td className = "p-[10px]"> {User.firstName} </td>
                <td className = "p-[10px]"> {User.lastName} </td>
                 <td className = "p-[10px]"> {User.gender} </td>
                  <td className = "p-[10px]"> {User.phoneNo} </td>
                   <td className = "p-[10px]"> {User.email} </td>
                       <td className = "p-[10px]"> {User.role} </td>
                        <td className="p-[10px]"> {User.notifications}
 
</td>
                           <td className = "p-[10px]"> {User.classLevel} </td>
                             <td className = "p-[10px]"> {User.guardianType} </td>
                             <td className = "p-[10px]"> {User.guardianName} </td>
                               <td className = "p-[10px]"> {User.guardianPhoneNo} </td>
                                 <td className = "p-[10px]"> {User.address} </td>
                                  <td className = "p-[10px]"> {User.isBlocked} </td>
                               <td className ="p-[10px] flex flex-row items-center justify-center">
                                 <BiTrash className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-red-500 cursor-pointer"
                               onClick={()=>{ const token=localStorage.getItem("token");

                          if (token == null){
                            navigate("/login");
                            return;

                               }
                           axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/users/"+User.userId,
                            {
                              headers:{
                                Authorization:`Bearer ${token}`
                              }
                            }
                          ).then(
                            (res)=>{
                              console.log("User deleted successfully");
                              console.log(res.data);
                              toast.success("User deleted successfully");
                             setIsLoading(!isLoading);
                            }
                          ).catch(
                            (error)=>{
                              console.error("Error deleting User: ",error)
                              toast.error("Failed to delete User")
                            }
                          );

                        }
                      }/>
                      <BiEdit onClick={
                        ()=>{
                          navigate("/admin/users/update/" + User.userId,
                            {
                              state:User
                            }
                          );
                        }
                      }
                      className="bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer ml-[10px]"/>
                      </td>
                  </tr>
                
            );
        }
      )
        }
         </tbody>
            </table>
}
          
            </div>
       

</div>
</div>

);
}
