import { useEffect, useState } from "react";
import Header from "./Header"
import { Link } from "react-router-dom";

const Landing = () => {
    const [showEasy, setShowEasy] = useState(true);
    const [showMedium, setShowMedium] = useState(false);
    const [showHard, setShowHard] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [showCard, setShowCard] = useState(false);

useEffect(() => {
   setTimeout(() =>{
        setShowEasy(false)
        setShowMedium(true) } , 1000);
    setTimeout(() => {
        setShowMedium(false)
        setShowHard(true)  },2000);
    setTimeout(() => {
        setShowHard(false)
        setShowPost(true)  },3000);
    setTimeout(() => {
        setShowCard(true)  },4000)
}, []);
  return (
    <>
        <Header/>
        <div className="flex flex-col justify-center items-center h-screen -mt-50 ">
          {showEasy && <h1 className="text-5xl md:text-6xl font-bold text-gray-800 transition-opacity">Not Easy</h1>}
          {showMedium && <h1 className="text-5xl md:text-6xl font-bold text-gray-800 transition-opacity">Not Medium</h1>}
          {showHard && <h1 className="text-5xl md:text-6xl font-bold text-gray-800 transition-opacity">It's Hard</h1>}
          {showPost && <h1 className="text-6xl md:text-7xl font-bold text-gray-900 transition-opacity">HardPosts</h1>}
          {showCard && (
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/feed" className="cursor-pointer">
                <button className="w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg cursor-pointer">
                  Feed
                </button>
              </Link>
              <Link to="/signup" className="cursor-pointer">
                <button className="w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors shadow-md hover:shadow-lg cursor-pointer">
                  Login/Register
                </button>
              </Link>
            </div>
          )}
        </div>
    </>
  )
}

export default Landing