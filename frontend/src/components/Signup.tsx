import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "hardposts-common";
import type { signupInputType } from "hardposts-common";
import { BASE_URL } from "../util/config";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

        useEffect(()=>{
            if(token){
                navigate('/feed');
            }},[])

    const handleSignup = async () => {
    try{
        // Client-side validation using Zod schema
        const signupData: signupInputType = { email, password };
        const validation = signupInput.safeParse(signupData);
        
        if (!validation.success) {
            // Show validation errors to user
            setError("Invalid input. Please check your email and password.");
            return;
        }

        const response = await axios.post(`${BASE_URL}/user/signup`, signupData);
        const jwtToken = response.data.jwt;
        localStorage.setItem("token", jwtToken);
        setError(""); // Clear any previous errors
        navigate('/profile'); // Redirect to feed after successful signup
        
    }catch(err){
        console.log(err);
        setError("Signup failed. Please try again.");
    }
}
  return (
    <>
    <div className="hidden lg:flex justify-center items-center h-screen  ">
        <div className="border border-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-2 w-1/2 h-full ">
         <h1 className="font-bold ml-70 mt-40 text-xl">Create an Account</h1>
         <h1 className="ml-60 text-lg">Already have an account? <Link to="/login" className="underline">Login</Link></h1>
         {error && <p className="text-red-500 ml-40">{error}</p>}
        <form onSubmit={(e)=>{e.preventDefault()}} className="flex flex-col mt-5">
            <label className="ml-40 font-semibold">Email</label>
            <input type="email" placeholder="Email@example.com" className="p-2 m-2 ml-40 border border-gray-300 rounded-lg w-1/2" onChange={(e)=>{setEmail(e.target.value)}} />
            <label className="ml-40 font-semibold">Password</label>
            <input type="password" placeholder="Enter your password" className="p-2 m-2 ml-40 border border-gray-300 rounded-lg w-1/2" onChange={(e)=>{setPassword(e.target.value)}} />
            <button type="submit" className=" bg-black w-1/2 text-white ml-40  p-2 border-gray-300 rounded-lg hover:opacity-75 cursor-pointer" onClick={handleSignup}>Sign Up</button>
        </form>
        </div>
          <div className="border border-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-2 w-1/2 h-full bg-stone-200 ">
            <Link to="/"><h2 className="mt-60 text-3xl font-bold">Hardposts</h2></Link>
            <h3 className="text-xl font-semibold">For posts that don’t smooth their edges or dilute their point.</h3>
            <h4>For thoughts too sharp for Medium, too long for tweets, and too honest for polite platforms.</h4>
        </div>
    </div>

    <div className="lg:hidden flex items-center justify-center min-h-screen px-4">
  <div className="w-full max-w-sm border border-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-4">
    
    <h1 className="font-bold text-xl">Create an Account</h1>

    <p className="text-sm">
      Already have an account?
      <Link to="/login" className="underline">
        Login
      </Link>
    </p>

    {error && <p className="text-red-500 text-sm">{error}</p>}

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
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </form>
  </div>
</div>

    </>
  )
}

export default Signup;