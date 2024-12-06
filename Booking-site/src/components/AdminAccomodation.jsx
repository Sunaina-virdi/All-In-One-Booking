import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function AdminAccomodation(){
    const { user } = useContext(UserContext);
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    },[]);
      
    return (
        <div> 
            <div className="mt-4 flex flex-col gap-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/place/' + place._id} className="flex cursor-pointer gap-4 bg-blue-200 p-4 rounded-2xl">
                        <div className="flex w-[20%] h-32 bg-gray-300 rounded-xl">
                            <PlaceImg place={place}/>
                        </div>
                        <div className="flex flex-col w-[80%]">
                            <h2 className="text-xl font-bold">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                            <span className="text-sm text-gray-600">Category: {place.category}</span>
                        </div>
                    </Link>
                ))}
            </div>
       
        </div>
    )
} 