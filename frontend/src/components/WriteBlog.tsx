import { useEffect, useState } from "react";
import Header from "./Header"
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
const [title, setTitle] = useState<string>("");
const [content, setContent] = useState<string>("");
const token = localStorage.getItem("token");
const navigate = useNavigate();

useEffect(()=>{
    if(!token){
        navigate('/login');
    }
},[])
  return (
    <>
      <Header title={title} content={content}/>
    <div>
        <div className="flex flex-col  items-center h-screen">
            <form className="flex flex-col w-full lg:w-1/2 h-full border-x border-gray-100 shadow-md  rounded-lg">
                <textarea className="p-15 m-5 text-3xl font-serif" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                <textarea className="p-10 m-5 h-full text-2xl font-serif overflow-y-scroll" placeholder="Write your thoughts without any filters...." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </form>

        </div>
    </div>
    </>
  )
}

export default WriteBlog