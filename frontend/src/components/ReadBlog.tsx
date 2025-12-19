import { useEffect, useState } from "react"
import Header from "./Header"
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../util/config";
import { mockdata } from "../util/mockdata";

const ReadBlog = () => {
    const [blog,setBlog] = useState<any>(mockdata);
   
    const {id} = useParams();

    const fetchBlog : any = async() => { 
        try{
            const res = await axios.get(`${BASE_URL}/blog/${id}`);
            console.log(res.data.blog);
            setBlog(res.data.blog || mockdata);
        }catch(err){
            console.log(err);
        }
       }

    useEffect(()=>{
        fetchBlog();
    },[]);

  return (
 <>
      <Header/>
    <div>
        {blog && (
        <div className="flex flex-col  items-center h-screen">
            <div className="flex flex-col w-full lg:w-1/2 h-full border-x border-gray-100 shadow-md  rounded-lg">
                <p className="pt-15 pb-5 mx-2 text-3xl font-serif">{blog.title}</p>
                <div className="flex items-center gap-3 ml-5 ">        
                <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-400 rounded-full">
                    <span className="font-medium text-body">{blog.author?.name.charAt(0).toUpperCase()}</span>
                </div>
                <p className="text-sm text-gray-500"> {blog.author?.name.toUpperCase()}</p>   
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="py-10 m-2 h-full text-2xl font-serif overflow-y-scroll">{blog.content}</p>
            </div>
        </div>
        )}
    </div>
    </>  
  )
}

export default ReadBlog;