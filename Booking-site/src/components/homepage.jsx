// import { useEffect, useState } from "react";
// import {Link} from "react-router-dom";
// import axios from "axios";

// export default function Homepage(){
//   const [places,setPlaces] = useState([]);
//   useEffect(() => {
//     axios.get('/places').then(response => {
//       setPlaces(response.data);
//     });
//   },[])
//     return (
//       <>
//         {/* <div className="flex flex-row gap-3 mt-16 justify-center">
//           <button className="border shadow-md shadow-blue-800 py-2 px-4 rounded-lg bg-gray-200">Pool</button>
//           <button className="border shadow-md shadow-blue-800 py-2 px-4 rounded-lg bg-gray-200">Hotel</button>
//           <button className="border shadow-md shadow-blue-800 py-2 px-4 rounded-lg bg-gray-200">Castle</button>
//           <button className="border shadow-md shadow-blue-800 py-2 px-4 rounded-lg bg-gray-200">Shikara</button>
//           <button className="border shadow-md shadow-blue-800 py-2 px-4 rounded-lg bg-gray-200">Villa</button>
//         </div> */}
//         <div className="mt-8 grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {places.length > 0 && places.map(place => (
//             <Link to={'/place/' +place._id}>
//               <div className="bg-gray-200 mb-2 rounded-2xl flex">
//                 {place.photos?.[0] && (
//                   <img className="object-cover aspect-square rounded-2xl" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt=""/>
//                 )}
//               </div>
//               <h2 className="font-bold ">{place.address}</h2>
//               <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>              
//               <div className="mt-1">
//                 <span className="font-bold">Rs {place.price} per night</span>
//               </div>
//             </Link>
//           ))}
//         </div>
//         </>
//     );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
  const [places, setPlaces] = useState([]); // All places fetched from the server
  const [filteredPlaces, setFilteredPlaces] = useState([]); // Filtered places to display
  const [selectedCategory, setSelectedCategory] = useState(""); // Currently selected category

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
      setFilteredPlaces(response.data); // Initially display all places
    });
  }, []);

  // Handle category selection
  function filterByCategory(category) {
    setSelectedCategory(category); // Update selected category
    if (category === "") {
      setFilteredPlaces(places); // Show all places if no category is selected
    } else {
      setFilteredPlaces(places.filter(place => place.category === category)); // Filter places by category
    }
  }

  return (
    <>
      <div className="flex flex-row gap-3 mt-16 justify-center">
        <button 
          className={`border shadow-md py-2 px-4 rounded-lg ${selectedCategory === "" ? "bg-primary text-white" : "bg-gray-200"}`} 
          onClick={() => filterByCategory("")}>
          All
        </button>
        <button 
          className={`border shadow-md py-2 px-4 rounded-lg ${selectedCategory === "pool" ? "bg-primary text-white" : "bg-gray-200"}`} 
          onClick={() => filterByCategory("pool")}>
          Pool
        </button>
        <button 
          className={`border shadow-md py-2 px-4 rounded-lg ${selectedCategory === "hotel" ? "bg-primary text-white" : "bg-gray-200"}`} 
          onClick={() => filterByCategory("hotel")}>
          Hotel
        </button>
        <button 
          className={`border shadow-md py-2 px-4 rounded-lg ${selectedCategory === "castle" ? "bg-primary text-white" : "bg-gray-200"}`} 
          onClick={() => filterByCategory("castle")}>
          Castle
        </button>
        <button 
          className={`border shadow-md py-2 px-4 rounded-lg ${selectedCategory === "shikara" ? "bg-primary text-white" : "bg-gray-200"}`} 
          onClick={() => filterByCategory("shikara")}>
          Shikara
        </button>
        <button 
          className={`border shadow-md py-2 px-4 rounded-lg ${selectedCategory === "villa" ? "bg-primary text-white" : "bg-gray-200"}`} 
          onClick={() => filterByCategory("villa")}>
          Villa
        </button>
      </div>

      <div className="mt-8 grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map(place => (
            <Link to={'/place/' + place._id} key={place._id}>
              <div className="bg-gray-200 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img 
                    className="object-cover aspect-square rounded-2xl" 
                    src={'http://localhost:4000/uploads/' + place.photos[0]} 
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">Rs {place.price} per night</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">No places found for the selected category.</p>
        )}
      </div>
    </>
  );
}
