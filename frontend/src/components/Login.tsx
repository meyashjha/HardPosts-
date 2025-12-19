import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "hardposts-common";
import type { signupInputType } from "hardposts-common";
import { BASE_URL } from "../util/config";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error,setError] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(()=>{
        if(token){
            navigate('/feed');
        }},[])
        
    const handleSignin = async () => {
    try{
      const signinData : signupInputType = { email, password };
      const validation = signupInput.safeParse(signinData);
      
      if (!validation.success) {
          setError("Invalid input. Please check your email and password.");
          return;
      }
        const response = await axios.post(`${BASE_URL}/user/signin`, {email,password});
        const jwtToken = response.data.jwt;
        localStorage.setItem("token", jwtToken);
        setError("");
        navigate('/feed');
    }catch(err : any){
        console.log(err);
        if(err.status === 404){
          setError("User not found. Please sign up.");
        }
    }
}
  return (
    <>
    <div className="hidden md:flex justify-center items-center h-screen  ">
        <div className="border border-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-2 w-1/2 h-full ">
         <h1 className="font-bold ml-70 mt-40 text-xl">Welcome Back</h1>
         <h1 className="ml-60 text-lg">Are you new here? <Link to="/signup" className="underline">Sign Up</Link></h1>
        {error && <p className="text-red-500 ml-40">{error}</p>}
        <form onSubmit={(e)=>{e.preventDefault()}} className="flex flex-col mt-5">
            <label className="ml-40 font-semibold">Email</label>
            <input type="email" placeholder="Email@example.com" className="p-2 m-2 ml-40 border border-gray-300 rounded-lg w-1/2" onChange={(e)=>{setEmail(e.target.value)}} />
            <label className="ml-40 font-semibold">Password</label>
            <input type="password" placeholder="Enter your password" className="p-2 m-2 ml-40 border border-gray-300 rounded-lg w-1/2" onChange={(e)=>{setPassword(e.target.value)}} />
            <button type="submit" className=" bg-black w-1/2 text-white ml-40  p-2 border-gray-300 rounded-lg hover:opacity-75 cursor-pointer" onClick={handleSignin}>Login</button>
        </form>
        </div>
        <div className="border border-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-2 w-1/2 h-full bg-gray-200 ">
            <Link to="/"><h2 className="mt-60 text-3xl font-bold">Hardposts</h2></Link>
            <h4 className="text-xl font-semibold">For thoughts too sharp for Medium.</h4>
            <h3>For the ideas you hesitate to publish because they might offend, confuse, or actually say something.</h3>
        </div>
    </div>

    <div className="md:hidden flex items-center justify-center min-h-screen px-4">
  <div className="w-full max-w-sm border border-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-4">
    
    <h1 className="font-bold text-xl">Welcome Back</h1>

    <p className="text-sm">
      Are you new here?
      <Link to="/signup" className="underline">
        Sign Up
      </Link>
    </p>
      {error && <p className="text-red-500">{error}</p>}      
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-3"
    >
      <label className="font-semibold">Email</label>
      <input
        type="email"
        placeholder="email@example.com"
        className="p-2 border border-gray-300 rounded-lg"
        onChange={(e)=>{setEmail(e.target.value)}}
      />

      <label className="font-semibold">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        className="p-2 border border-gray-300 rounded-lg"
        onChange={(e)=>{setPassword(e.target.value)}}
      />

      <button
        type="submit"
        className="mt-2 bg-black text-white p-2 rounded-lg"
        onClick={handleSignin}
      >
        Login
      </button>
    </form>
  </div>
</div>

    </>
  )
}

export default Login;