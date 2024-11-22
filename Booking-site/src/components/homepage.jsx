import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Homepage(){
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  },[])
    return (
        <div className="mt-8 grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 && places.map(place => (
            <Link to={'/place/' +place._id}>
              <div className="bg-gray-200 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img className="object-cover aspect-square rounded-2xl" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt=""/>
                )}
              </div>
              <h2 className="font-bold ">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>              
              <div className="mt-1">
                <span className="font-bold">${place.price} per night</span>
              </div>
            </Link>
          ))}
        </div>
    );
}