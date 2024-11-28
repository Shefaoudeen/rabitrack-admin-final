import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { FaUnlock } from "react-icons/fa";
import { IoEye,IoEyeOff  } from "react-icons/io5";
import Spinner from "../Components/Spinner";
import { loginBG } from "../assets";

const Login = () => {
    const [error, setError] = useState()
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const navigate = useNavigate();
    const onLogin = () => {
        if(!username && !password) return setError("Please enter username and password")
        setIsLoading(true)
        axios.post(`${import.meta.env.VITE_BASE_URL}/admin-login`, {username : username,password : password})
            .then((res) => {
                res.data.isAuth ? navigate("/") : setError("username and password doesn't match")
                setIsLoading(false)
            })
            .catch(err => {setError(err.message + ", Please try again!"); setIsLoading(false)})
    };
    return (
        <div className="w-screen flex flex-col items-center justify-center text-xl select-none" style={{backgroundImage: `url(${loginBG})`}}>
            <div className="bg-blue-100 rounded-lg flex flex-col gap-y-5 shadow-lg">
                <div className="flex items-center justify-center bg-blue-500 rounded-t-lg font-bold text-2xl py-4 overflow-hidden text-white text-center"><h1>Login</h1><RiLoginCircleLine size={30} className="ml-3 max-h-fit"/></div>
                <div className="flex flex-col p-6 gap-y-5">
                    <div className="flex items-center gap-x-4 py-2 px-4 rounded-full bg-white border-blue-500 focus-within:ring-2">
                        <IoPerson/>
                        <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter username" className=" ring-0 border-0 outline-0" />
                    </div>
                    <div className="flex items-center justify-between gap-x-4 py-2 px-4 rounded-full bg-white border-blue-500 focus-within:ring-2">
                        <div className="flex gap-4 items-center">
                            <FaUnlock/>
                            <input onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key==="Enter" && onLogin()} type={`${isPasswordHidden ? "password" : "text"}`} placeholder="Enter password" className=" ring-0 border-0 outline-0" />
                        </div>
                        {isPasswordHidden ? <IoEye className="cursor-pointer" onClick={() => setIsPasswordHidden(false)}/> : <IoEyeOff className="cursor-pointer" onClick={() => setIsPasswordHidden(true)}/> }
                    </div>
                    <button onClick={onLogin} className="flex justify-center items-center gap-2 py-2 px-8 bg-blue-600 text-white rounded-full hover:bg-white hover:text-blue-500 duration-300 shadow-md">{isLoading && <Spinner size={20}/>} login</button>
                    {error && <h2 className="text-sm px-4 text-red-600">*{error}</h2>}
                </div>
            </div>
        </div>
    );
};

export default Login;
