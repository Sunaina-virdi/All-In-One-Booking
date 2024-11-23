import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function HomePlacePage(){
    const {id} = useParams();
    const [place,setPlace] = useState(null);
    

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/' + id).then(response => {
            setPlace(response.data);
        });
    },[id]);

    if(!place) return '';

    

    return (
        <div className=" mt-8 bg-gray-100 px-10 -mx-8 pt-8">
            <div className="max-w-[1140px] mx-auto ">
                <h1 className="text-3xl">{place.title}</h1>
                <a className="flex gap-1 my-3 font-semibold underline" target="_blank" 
                    href={'https://maps.google.com/?q=' + place.address}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <h2>{place.address}</h2>
                </a>
                {/* <div className="relative flex justify-center items-center">
                    <div className="flex flex-row gap-3">
                        <div>
                            {place.photos?.[0] && (
                                <div>
                                    <img onClick={() => setShowAllPhotos(true)} className=" h-[31rem] w-[45rem] rounded-xl cursor-pointer" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""/>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            {place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className="h-[15rem] w-[25rem] rounded-xl cursor-pointer" src={'http://localhost:4000/uploads/'+place.photos[1]} alt=""/>
                            )}
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="h-[15rem] w-[25rem] rounded-xl cursor-pointer" src={'http://localhost:4000/uploads/'+place.photos[2]} alt=""/>
                            )}
                        </div>
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-xl shadow-md shadow-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                    </svg>
                        Show more photos
                    </button>
                </div> */}
                <PlaceGallery place={place}/>
                
                <div className="mt-10 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        {/* description */}
                        <div className="my-4">
                            <h2 className="text-2xl font-semibold">Description</h2>
                            {place.description}
                        </div>
                        {/* check in check out */}
                        Check-in: {place.checkIn} <br/>
                        Check-out: {place.checkOut} <br/>
                        Max number of guests : {place.maxGuests}
                        
                    </div>
                    <div>
                        <BookingWidget place={place}/>
                    </div>
                </div>

                {/* Extra info */}
                <div className="bg-white -mx-8 p-8 border-t">
                    <div>
                        <h2 className="text-2xl font-semibold">Extra info</h2>
                    </div>
                    <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
                </div>
                
            </div>
        </div>
    )
}