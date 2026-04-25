import { Link } from "react-router-dom";

export default function LoginPage(){
    return(
        <div className="w-full min-h-screen bg-gray-100 flex flex-col">

{/*heading Image*/}
        <div className="w-full h-62.5 bg-[url(./loginImageLMs.jpg)] bg-cover bg-top ">
        </div>

{/*form*/}
            <div className=" flex-1 flex items-center justify-center ">
                 <div className="w-[500px] h-[500px] rounded-xl flex flex-col items-center justify-center">
                    <h1 className="  text-2xl font-bold text-center mb-5"> Login </h1>

                    <div className="w-[350px] flex flex-col">
                        <span className="text-lg"> Email </span>
                        <input type="text" className="w-[350px] h-[40px] border border-gray-400 rounded-xl"></input>
                    </div>

                    <div className="w-[350px] flex flex-col">
                        <span className="text-lg"> Password </span>
                        <input type="password" className="w-[350px] h-[40px] border border-gray-400 rounded-xl"></input>
                    </div>
{/*Loging button*/}
<button className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
    Login</button>

    <p>Don't have an account? <Link to="/register" className="text-blue-500">Sign Up from here</Link> </p>

        
        </div>
            </div>
          
        
        </div>
    )
}