import { Link } from "react-router-dom"

const BlogCard = ({title, content, author , createdAt , id} : {title: string, content: string, author: string, createdAt: string, id: string}) => {
  return (
    <div className="border-b border-slate-300 rounded-2xl p-4 mb-4 lg:w-1/2 hover:bg-gray-100 cursor-pointer">
        <Link to={`/blog/${id}`}>
        <div className="flex items-center gap-3 mb-2">        
        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-400 rounded-full">
            <span className="font-medium text-body">{author?.charAt(0).toUpperCase()}</span>
        </div>
        <p className="text-sm text-gray-500"> {author.toUpperCase()}</p>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <h2 className="text-2xl font-bold mb-2">{title}</h2>    
        <p className="text-gray-700 mb-4">{content.slice(0,100)}...</p>  
       <p className="text-sm text-gray-500">{Math.ceil(content.length/100)} min read</p>
        </Link>
    </div>
  )
}

export default BlogCard