import {useParams ,Link} from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function PlacesPage(){
    const { user } = useContext(UserContext);
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    },[]);
    function handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this place?')) {
          axios  
            .delete(`/places/${id}`)
            .then(() => {
              // Update the state after deletion
              setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== id));
              alert('Place deleted successfully!');
            })
            .catch((error) => {
              console.error('Error deleting place:', error);
              alert('Failed to delete the place.');
            });
        }
      }
      
    return (
        <div className="bg-bg1"> 
        <AccountNav role={user?.role}/>
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-bg2 shadow-md shadow-shadow text-white mt-4 py-2 px-4 rounded-full" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                Add new place
                </Link>
            </div>
            <div className="mt-4 flex flex-col gap-4 px-8">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-bg3 p-4 rounded-2xl">
                        <div className="flex w-[20%] h-32 bg-gray-300 rounded-xl">
                            <PlaceImg place={place}/>
                        </div>
                        <div className="flex flex-col w-[80%] text-white">
                            <h2 className="text-xl font-bold">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                            <span className="text-sm text-black font-semibold">Category: {place.category}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(place._id)}
                            className="text-red-500 font-semibold bg-light px-4 h-20 mt-6 rounded-lg hover:bg-red-200">
                            Delete
                        </button>
                    </Link>
                ))}
            </div>
       
        </div>
    )
} 