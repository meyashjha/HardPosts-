import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/config";
import axios from "axios";

const Header = ({title, content}:{title?:string, content?:string}) => {
  const navigate = useNavigate();
    const publishPost : any = async(published:boolean)=>{  
    try{
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/blog/create`,{
        title,
        content,
        published
      },{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/feed');

    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="bg-slate-50 h-[10%] p-2 rounded-b-lg  shadow-sm ">
        <div className=" flex justify-between">
        <div className="flex justify-left">
            <Link to="/"><img alt="Hardpost-logo" src="/HardPosts.png" className=" h-10 w-10 rounded-full transition-transform duration-700 hover:scale-115"/></Link>
        </div>
        <div className="items-center h-full py-2 gap-3 flex mx-2">

            {window.location.pathname === '/feed' ? (<></>) : (
            <Link to="/feed"><button className="text-sm font-semibold text-center h-7 bg-white rounded-3xl  px-3 on hover:bg-slate-200 cursor-pointer">Feed</button></Link>
            )}

            {window.location.pathname !== '/new-post' && window.location.pathname !== '/' ? (
            <Link to="/new-post"><button className="text-sm font-semibold text-slate-700 text-center h-7 bg-white rounded-3xl  px-3 on hover:bg-slate-200 cursor-pointer">✎ᝰ. Write</button></Link>
            ):(<></>)}

            {window.location.pathname === '/profile' || window.location.pathname === '/' ? (<></>) : (
            <Link to="/profile"><button className="text-sm font-semibold text-center h-7 bg-white rounded-3xl  px-3 on hover:bg-slate-200 cursor-pointer">Profile</button></Link>
            )}
        
            {window.location.pathname === '/new-post' ? (<>
            <button className="text-sm font-semibold text-center h-7 bg-green-500 rounded-4xl hover:opacity-80 cursor-pointer  px-2" onClick={() => publishPost(true)}>Publish</button>
            <button className="text-sm font-semibold text-center h-7 bg-yellow-500 rounded-4xl hover:opacity-80 cursor-pointer  px-2" onClick={() => publishPost(false)}>Save Draft</button>
            </>) : null}

            {window.location.pathname === '/' ? (<>
            <Link to="/login"><button className="text-sm font-semibold text-center h-7 bg-blue-500 rounded-3xl hover:bg-blue-600 cursor-pointer  px-3">Login</button></Link>
            <Link to="/signup"><button className="text-sm font-semibold text-center h-7 bg-green-500 rounded-3xl hover:bg-green-600 cursor-pointer  px-3">Register</button></Link>
            </>) : null}

        </div> 
        </div>

    </div>
  )
}

export default Header
