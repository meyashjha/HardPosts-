import axios from "axios";
import { useEffect, useState } from "react"
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/config";

const Profile = () => {
  const [user,setUser] = useState<{email: string, name: string}>();
  const navigate = useNavigate();
  const [name,setName] = useState<string>("");

  const logout : any = async()=>{
    try{
      const token = localStorage.getItem("token");
       await axios.post(`${BASE_URL}/user/signout`, {}, {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem("token");
      navigate('/login');
    }catch(err){
      console.log(err);
    }
  }

  const updateName : any = async()=>{
    try{
      const token = localStorage.getItem("token");
      const res = await axios.put(`${BASE_URL}/user/profile/edit`,{
          name: name
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(res.data.user);
      navigate('/feed');
    } catch(err){
      console.log(err);
    }
  }
  const fetchProfile : any = async() => {
    try{
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/user/profile`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(res.data.user);
      setName(res.data.user.name || "Unknown");
    } catch(err){
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(()=>{fetchProfile()},[])

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center h-screen">
      {user && (
        <>
        <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-400 rounded-full -mt-15 mb-2">
            <span className="font-medium text-body">{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</span>
        </div>

        <div className="flex flex-col border border-gray-300 p-4 rounded-lg shadow-md gap-4 lg:w-1/4 w-3/4">
          <label>Email:</label>
          <input value={user.email} readOnly  className="border border-gray-400 p-2 m-2 rounded-lg shadow-md"/>
          <label>Name:</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="border border-gray-400 p-2 m-2 rounded-lg shadow-md"  />
          <div className="flex justify-between">
            <button className="text-sm font-semibold text-center text-white h-8 bg-red-500 rounded-lg  m-2 px-3 on hover:bg-red-200 cursor-pointer" onClick={logout}>Logout</button>
            <button className="text-sm font-semibold text-center text-white h-8 bg-blue-500 rounded-lg m-2  px-3 on hover:bg-blue-200 cursor-pointer" onClick={updateName}>Update Name</button>
          </div>
        </div>
        </>
      )}
      </div>
    </div>
  )
}

export default Profile