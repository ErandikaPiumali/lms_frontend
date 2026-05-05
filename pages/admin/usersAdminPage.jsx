import { useNavigate } from "react-router-dom";

export default function UsersAdminPage(){
    const navigate = useNavigate();
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
        placeholder="Search.."
        className="border px-3 py-2 rounded">

        </input>
        <button className="border px-4 py-2 rounded">
 filter
 </button> 
 </div>
          
      </div>

      <div className="flex-1 w-full border border-gray-500 rounded bg-white overflow-auto">

 <table className="min-w-[900px] w-full text-left">
  
  </table>

      </div>
        </div>
    )
}