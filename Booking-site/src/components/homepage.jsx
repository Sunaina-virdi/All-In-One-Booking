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
    <div className="p-8 bg-bg1">
      <div className="flex justify-center gap-4 my-8">
         {["", "pool", "castle", "shikara", "villa"].map((category) => (
           <button
             key={category}
             className={`px-6 py-2 rounded-full shadow-lg transition-all ${
               selectedCategory === category
                 ? "bg-bg3 text-white"
                 : "bg-gray-200 text-gray-800 hover:bg-bg2 hover:text-white"
             }`}
             onClick={() => filterByCategory(category)}
           >
             {category === "" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
           </button>
         ))}
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
              <h2 className="font-bold text-white">{place.address}</h2>
              <h3 className="text-sm text-purple-100 truncate">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold text-gray-300">Rs {place.price} per night</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">No places found for the selected category.</p>
        )}   
      </div>
      <footer className="bg-bg2 text-white py-4 mt-12">
          <div className="text-center">
              <p className="text-sm">© {new Date().getFullYear()} Allin1. All rights reserved.</p>
              <p className="text-xs">Designed and developed with ❤️</p>
          </div>
      </footer>
    </div>
  );
}
