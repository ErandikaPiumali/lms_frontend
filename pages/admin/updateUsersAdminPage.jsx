import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function UpdateUsersAdminPage(){
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("")
  const [errors,setErrors] = useState({});

  const [formData, setFormData ] = useState ({
      firstName: "",
      lastName:  "",
      gender:  "",
      phoneNo: "",
      email: "",
     

      classLevel: "",
      guardianType: "",
      guardianName: "",
      guardianPhoneNo:  "",

      address:  "",
      isBlocked: false,
      profilePic: "",
      isPhoneVerified:  false,
      isEmailVerified:  false,
    
    });

const { userId } = useParams();


useEffect(() => {

  const token = localStorage.getItem("token");
 axios.get(
    import.meta.env.VITE_BACKEND_URL + "/api/users/" + userId,
    
    {
      headers:{
        Authorization:"Bearer " + token
      }
    }
  )
  .then((res)=>{

    const user = res.data;

    setFormData({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    gender: user.gender || "",
    phoneNo: user.phoneNo || "",
    email: user.email || "",
    role: user.role || "",
    notifications: user.notifications || "",
    classLevel: user.classLevel || "",
    guardianType: user.guardianType || "",
    guardianName: user.guardianName || "",
    guardianPhoneNo: user.guardianPhoneNo || "",
    address: user.address || "",
    profilePic: user.profilePic || "",
    isBlocked: user.isBlocked || false,
    isPhoneVerified: user.isPhoneVerified || false,
    isEmailVerified: user.isEmailVerified || false,
  });



   
  })
  .catch((err)=>{
    console.log(err);
    toast.error("Failed to load user");
  });

}, []);

function validationForm(){

  let newErrors={};

const validLevels = ["Grade 11", "Grade 12", "Grade 13", "Adult"];
const validRoles = ["Student","Teacher","Admin","Payment Manager","Assistant"]
const validGuardianTypes = ["Mother","Father","Guardian"];

  if(!formData.firstName)newErrors.firstName = "First name is required";
   if(!formData.lastName)newErrors.lastName = "Last name is required";

    if(!formData.email){
      newErrors.email = "Email is required";
    } else if(!/^\S+@\S+\.\S+$/.test(formData.email)) {
  newErrors.email = "Invalid email format";
}
   
  if (!formData.gender) {
  newErrors.gender = "Select gender";
}


      if(!formData.phoneNo) {newErrors.phoneNo = "Phone Number is required";}
      else if (!/^[0-9]{10}$/.test(formData.phoneNo)) {
        newErrors.phoneNo = "Phone Number must be 10 digits"
      }


  

if (!validRoles.includes(formData.role)) {
  newErrors.role = "Invalid role selected";
}

if (
  formData.role === "Student" &&
  !validLevels.includes(formData.classLevel)
) {
  newErrors.classLevel = "Invalid class level";
}
        if(formData.role === "Student"){
          if(formData.classLevel  !== "Adult" ) {
            if(!formData.guardianName) newErrors.guardianName = "Guardian Name is required";
          }
        }
            if (formData.role === "Student" && formData.classLevel !== "Adult") {
            if (!formData.guardianPhoneNo) { 
              newErrors.guardianPhoneNo = "Phone number is required";
} else if (!/^[0-9]{10}$/.test(formData.guardianPhoneNo)) {
  newErrors.guardianPhoneNo = "Phone number must be 10 digits";
}
 }
 
         

if (formData.role === "Student" && formData.classLevel !== "Adult") {
  if (!validGuardianTypes.includes(formData.guardianType)) {
    newErrors.guardianType = "Select valid guardian type";
  }
}
setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
 
}

function handleChange(e) {
  const { name, value } = e.target;

   const booleanFields = ["isBlocked", "isEmailVerified", "isPhoneVerified"];
  const parsedValue = booleanFields.includes(name)
    ? value === "true"
    : value;

  setFormData(prev => ({
    ...prev,
    [name]: parsedValue
  }));
}


function handleSubmit(){
  setServerError("");
  if(!validationForm())
    return;

    const userData ={ ...formData };

 if (userData.role !== "Student") {
  delete userData.classLevel;
  delete userData.guardianType;
  delete userData.guardianName;
  delete userData.guardianPhoneNo;
}
   
  if (userData.role === "Student" && userData.classLevel === "Adult") {
    delete userData.guardianType
   delete  userData.guardianName
    delete userData.guardianPhoneNo
  }

  const token = localStorage.getItem("token");
  if(token==null){
    window.location.href="/login";
    return;
  }
  axios.put(import.meta.env.VITE_BACKEND_URL + "/api/users/"+ userId, userData,{
    headers:{
        Authorization:"Bearer " + token
    }
  }).then((res)=>{
   toast.success ("User updated Successfully")
    console.log("User updated successfully");
    navigate("/admin/users")
    console.log(res.data);
  
  }).catch((error)=>{
  const msg = error.response?.data?.message || "Something went wrong";
  toast.error("Failed to update user")
  setServerError(msg);
  console.error("Error adding user: ", error );
})
  console.log(userData)
}

const isStudent =formData.role === "Student";
const isAdultStudent = formData.classLevel === "Adult";


    return(
        <div className="w-full h-full flex justify-center items-center">

<div className=" border-[3px] rounded-[15px] flex flex-wrap justify-between p-[40px]">

   
     <div className="w-[200px] flex flex-col gap-[5px]">
     
<label className="text-sm font-semibold"> First Name </label>
<input type="text" name="firstName"
value={formData.firstName}
onChange={handleChange}
 className="w-full border h-[40px] rounded-md shadow-lg"/>

  {errors.firstName && (
    <span className="text-red-500 text-xs">
      {errors.firstName}
    </span>
  )}
 </div>

     <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Last Name </label>
<input type="text" 
name="lastName"
value={formData.lastName}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg"/>
{errors.lastName && (
  <span className="text-red-500 text-xs">
    {errors.lastName}
  </span>
)}
</div>

 <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold">Gender </label>

<select id="Gender" name="gender"
value={formData.gender}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg">
   <option value="">Select Gender</option>
 <option value="Male"> Male </option>
     <option value="Female"> Female </option>
    
</select>
{errors.gender && (
  <span className="text-red-500 text-xs">
    {errors.gender}
  </span>
)}
 </div>


     <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Phone Number </label>
<input type="text" name="phoneNo"
value={formData.phoneNo}
onChange={handleChange}  
className="w-full border h-[40px] rounded-md shadow-lg"/>
{errors.phoneNo && (
  <span className="text-red-500 text-xs">
    {errors.phoneNo}
  </span>
)}

    </div>
     <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Email </label>
<input type="email" name="email"
value={formData.email}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg"/>
{errors.email && (
  <span className = "text-red-500 text-xs">
    {errors.email}
  </span>
)}

    </div>
   
 <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold">Notifications </label>

<select id="notifications" name="notifications"
value={formData.notifications}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg">
   <option value="">Select Notification Type</option>
 <option value="Email"> Email </option>
     <option value="SMS"> SMS </option>
    
</select>
{errors.notifications && (
  <span className="text-red-500 text-xs">
    {errors.notifications}
  </span>
)}
 </div>

     <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Role </label>
<select id="role" name="role"
value={formData.role}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg">
      <option value="">Select Role</option>
    <option value="Teacher"> Teacher </option>
     <option value="Student">Student </option>
      <option value="Payment Manager">Payment Manager </option>
        <option value="Assistant">Assistant </option>
          <option value="Admin">Admin </option>

</select>
{errors.role && (
  <span className="text-red-500 text-xs">
    {errors.role}
  </span>
)}

    </div>
      {isStudent && (

      <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold">Grade </label>

<select id="ClassLevel" name="classLevel"
value={formData.classLevel}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg">
     <option value=""> Select Grade </option>
    <option value="Grade 11"> Grade 11 </option>
     <option value="Grade 12">Grade 12 </option>
      <option value="Grade 13">Grade 13 </option>
        <option value="Adult">Adult </option>
</select>
{errors.classLevel && (
  <span className="text-red-500 text-xs">
    {errors.classLevel}
  </span>
)}

 </div>
 
 )}

     {isStudent && !isAdultStudent && (
   <>
     <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold">Guardian Type </label>

<select id="guardianType" name="guardianType" value={formData.guardianType}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg">
    <option value="">Select Guardian Type</option>
    <option value="Mother"> Mother </option>
     <option value="Father">Father </option>
      <option value="Guardian">Guardian </option>
</select>
{errors.guardianType && (
  <span className="text-red-500 text-xs">
    {errors.guardianType}
  </span>
)}
 </div>
  

   <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Guardian Name </label>
<input type="text" name="guardianName"
value={formData.guardianName}
onChange={handleChange}
 className="w-full border h-[40px] rounded-md shadow-lg"/>
 {errors.guardianName && (
  <span className="text-red-500 text-xs">
    {errors.guardianName}
  </span>
)}
 </div>

    
      <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Guardian Phone Number </label>
<input type="text" name="guardianPhoneNo"
value={formData.guardianPhoneNo}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg"/>
{errors.guardianPhoneNo && (
  <span className="text-red-500 text-xs">
    {errors.guardianPhoneNo}
  </span>
)}
</div>


     </>
   )}
 

     <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Address </label>
<input type="text"name="address"
value={formData.address}
onChange={handleChange}
 className="w-full border h-[40px] rounded-md shadow-lg"/>

    </div>

     <div className="w-[200px] flex flex-col gap-[5px]">
<label className="text-sm font-semibold"> Profile picture </label>
<input type="text"
name="profilePic"
value={formData.profilePic}
onChange={handleChange}
className="w-full border h-[40px] rounded-md shadow-lg"/>

    </div>
 <div className="w-[200px] flex flex-col gap-[5px]">
  <label className="text-sm font-semibold">Block User</label>
  <select name="isBlocked" value={formData.isBlocked} onChange={handleChange}
    className="w-full border h-[40px] rounded-md shadow-lg">
    <option value={false}>Active</option>
    <option value={true}>Blocked</option>
  </select>
</div>   

<div className="w-[200px] flex flex-col gap-[5px]">
  <label className="text-sm font-semibold">Phone Verified</label>
  <select name="isPhoneVerified" value={formData.isPhoneVerified} onChange={handleChange}
    className="w-full border h-[40px] rounded-md shadow-lg">
    <option value={false}>No</option>
    <option value={true}>Yes</option>
  </select>
</div>

<div className="w-[200px] flex flex-col gap-[5px]">
  <label className="text-sm font-semibold">Email Verified</label>
  <select name="isEmailVerified" value={formData.isEmailVerified} onChange={handleChange}
    className="w-full border h-[40px] rounded-md shadow-lg">
    <option value={false}>No</option>
    <option value={true}>Yes</option>
  </select>
</div>
    

<div className="w-full flex justify-center flex-row py-[20px]">
    <Link to={"/admin/users"} className="w-[200px] h-[40px] bg-white text-black rounded-md flex justify-center items-center border-[2px] shadow-lg"> Cancel</Link>


</div>
{serverError && (
  <div className="text-red-500 text-sm w-full text-center mb-2">
    {serverError}
  </div>
)}
<button
  onClick={handleSubmit}
  className="w-[200px] h-[50px] bg-blue-500 text-white rounded-md flex justify-center items-center border-[2px] ml-[20px]">
  Update User
</button>



</div>



</div>
)
}

      
    
