import {useParams ,Link} from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage(){
    // const { user } = useContext(UserContext);
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    },[]);
    return (
        <div> 
        <AccountNav />
            <div className="text-center">
            {/* <h3>List of all added places</h3><br/> */}
                <Link className="inline-flex gap-1 bg-primary text-white mt-4 py-2 px-4 rounded-full" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                Add new place
                </Link>
            </div>
            <div className="mt-4 flex flex-col gap-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-[20%] h-32 bg-gray-300 rounded-xl">
                            {place.photos.length > 0 && (
                                <img className="object-cover w-full rounded-xl" src={'http://localhost:4000/uploads/' + place.photos[0]} alt=""/>
                            )}
                            {/* <PlaceImg place={place}/> */}
                        </div>
                        <div className="flex flex-col w-[80%]">
                            <h2 className="text-xl font-bold">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
       
        </div>
    )
} 