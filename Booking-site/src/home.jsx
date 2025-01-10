import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';
import bg from '../src/assets/bg.jpg'

export default function Header() {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search input
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const navigate = useNavigate(); // For navigation

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 1) {
      try {
        const res = await axios.get(`http://localhost:4000/search?query=${e.target.value}`);
        setSearchResults(res.data.places); // Assuming you are returning places in the response
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    } else {
      setSearchResults([]); // Clear suggestions if input length is < 1
    }
  };

  return (
    <div className="">
    <section
         className="relative bg-cover bg-center h-screen"
         style={{ backgroundImage: `url(${bg})` }}> 
     <div className="absolute inset-0 bg-black bg-opacity-35"></div>
    <header className='flex justify-between'>
      <Link to={'/'} className='flex items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 -rotate-90 text-blue-800">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className='font-bold text-2xl text-blue-800'>Allin1</span>
      </Link>

      <form onSubmit={handleSearch} className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-blue-800">
        <input
          type="text"
          placeholder="Search anywhere"
          value={searchQuery}
          onChange={handleSearch} // Update search input state and fetch data
          className="bg-transparent outline-none flex-grow"
        />
        <button type="submit" className="bg-blue-800 text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
        </button>
      </form>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="absolute bg-white shadow-md w-full mt-20 rounded-lg">
          {searchResults.map((place) => (
            <div key={place._id} className="p-2 hover:bg-gray-200">
              <Link to={`/place/${place._id}`} onClick={() => {
            setSearchResults([]);  // Clear search results
            setSearchQuery('');     // Clear search query in the input
          }}>{place.address}</Link>
            </div>
          ))}
        </div>
      )}

      <Link to={'/account'} className='flex items-center gap-2 text-blue-800 font-semibold border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-blue-800'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </div>
        {!!user && (
          <div>
            {user.name}
          </div>
        )}
      </Link>
    </header>
    </section> 
    </div>
  );
}





// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "./UserContext";
// import axios from "axios";
// import bg from "../src/assets/bg.jpg";

// export default function App() {
//   const { user } = useContext(UserContext);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setSearchQuery(e.target.value);

//     if (e.target.value.length >= 1) {
//       try {
//         const res = await axios.get(
//           `http://localhost:4000/search?query=${e.target.value}`
//         );
//         setSearchResults(res.data.places); // Assuming `places` is returned from the API
//       } catch (error) {
//         console.error("Error fetching search results", error);
//       }
//     } else {
//       setSearchResults([]); // Clear suggestions if input length < 1
//     }
//   };

//   return (
//     <div className="font-sans">
//       {/* Hero Section */}
//       <section
//         className="relative bg-cover bg-center h-screen"
//         style={{ backgroundImage: `url(${bg})` }}
//       >
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black bg-opacity-35"></div>

//         {/* Header */}
//         <div className="flex justify-between items-center p-4 text-white">
//           <Link to="/" className="flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg" fill="none"
//               viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 -rotate-90 text-white">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
//             </svg>
//             <span className="font-bold text-2xl text-white">Allin1</span>
//           </Link>
//           {searchResults.length > 0 && (
//             <div className="absolute bg-white shadow-md w-full mt-2 rounded-lg max-w-md text-black">
//               {searchResults.map((place) => (
//                 <div
//                   key={place._id}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                 >
//                   <Link
//                     to={`/place/${place._id}`}
//                     onClick={() => {
//                       setSearchResults([]);
//                       setSearchQuery("");
//                     }}
//                   >
//                     {place.address}
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//           {/* Navigation */}
//           {/* <nav className="space-x-4">
//             <a href="#home" className="hover:text-blue-400">
//               Home
//             </a>
//             <a href="#about" className="hover:text-blue-400">
//               Features
//             </a>
//             <a href="#contact" className="hover:text-blue-400">
//               Contact
//             </a>
//           </nav> */}

//           {/* User Section */}
//           <Link
//             to="/account"
//             className="flex items-center gap-2 text-white font-semibold border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-blue-800"
//           >
//             <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-6 h-6 relative top-1"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             {!!user && <div>{user.name}</div>}
//           </Link>
//         </div>

//         {/* Hero Content */}
//         <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
//           <h1 className="text-4xl font-bold mb-4">TAKE YOUR VACATION NOW</h1>
//           <p className="text-xl mb-6">You know you deserve it!</p>
//           <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
//             Book Now
//           </button>

//           {/* Search Form */}
//           <form
//             onSubmit={(e) => e.preventDefault()}
//             className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-blue-800 bg-white text-black mt-8"
//           >
//             <input
//               type="text"
//               placeholder="Search anywhere"
//               value={searchQuery}
//               onChange={handleSearch}
//               className="bg-transparent outline-none flex-grow"
//             />
//             <button
//               type="submit"
//               className="bg-blue-800 text-white p-2 rounded-full"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-4 h-4"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                 />
//               </svg>
//             </button>
//           </form>

//           {/* Display Search Results */}
          
//         </div>
//       </section>
//     </div>
//   );
// }
