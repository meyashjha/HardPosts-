import axios from "axios";
import { BASE_URL } from "../util/config";
import BlogCard from "./BlogCard";
import Header from "./Header";
import React, { useEffect, useState } from "react";

const Feed = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs :any = async()=>{
    try{
      const res = await axios.get(`${BASE_URL}/blog/bulk`);
      setBlogs(res.data.blogs);
    }catch(err){  console.log(err);}
    }
    useEffect(()=>{
      fetchBlogs();
    },[]);
  
  return (
    <div>
      <Header/>
      <div className="flex flex-col  items-center">
        <h1 className="text-3xl font-bold p-2">Welcome to the Feed!</h1>
        <BlogCard title="Why You should Hire me" content="I'm a passionate full-stack developer with a love for creating exceptional user experiences..." author="Yash" createdAt="2025-12-19T00:00:00.000Z" id="1" />
      
        {blogs && blogs.map((blog:any)=>(
          <React.Fragment key={blog.id}>
          {blog.published && <BlogCard title={blog.title} content={blog.content} author={blog.author.name} createdAt={blog.createdAt} id = {blog.id} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Feed;