// import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function SearchResults() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const query = queryParams.get('query'); // Extract the search query
//   const [results, setResults] = useState([]); // State to store search results
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     if (query) {
//       setLoading(true);
//       axios
//         .get(`/api/search?query=${encodeURIComponent(query)}`) // Call the search API
//         .then((response) => {
//           setResults(response.data); // Store the results in state
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching search results:', error);
//           setLoading(false);
//         });
//     }
//   }, [query]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!results.length) {
//     return <div>No results found for "{query}".</div>;
//   }

//   return (
//     <div>
//       <h1>Search Results for "{query}"</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {results.map((place) => (
//           <div key={place._id} className="border p-4 rounded shadow">
//             <img
//               src={place.photos[0]}
//               alt={place.title}
//               className="w-full h-48 object-cover rounded"
//             />
//             <h2 className="font-semibold text-lg mt-2">{place.title}</h2>
//             <p className="text-gray-500">{place.address}</p>
//             <p className="text-gray-600 mt-2">
//               ${place.price} / night · {place.maxGuests} guests
//             </p>
//             <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

