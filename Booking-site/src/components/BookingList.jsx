import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { format, differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import ReviewsSection from "./ReviewsSection";
import ReviewForm from "./ReviewForm";
export default function BookingPlace(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    useEffect(() => {
        if(id){
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id)
                if(foundBooking){
                    setBooking(foundBooking);
                }
            })
        }
    },[id]); 

    const handleAddReview = (updatedReviews) => {
        setPlace((prev) => ({ ...prev, reviews: updatedReviews }));
    };


    if(!booking){
        return '';
    }
    return (
        <div className="my-8">
            {/* single booking page: + {id} */}
            {/* <div className="text-center max-w-lg mx-auto my-6 rounded-2xl shadow-md shadow-blue-800 p-5 bg-blue-800 text-white">
                <h1 className="text-xl">Your Booking has been confirmed for :<br/>
                Name: {booking.name} <br/>
                Phone: {booking.phone}</h1>
            </div> */}
            <div className="max-w-[1140px] mx-auto ">
                <h1 className="text-3xl">{booking.place.title}</h1>
                <a className="flex gap-1 my-3 font-semibold underline" target="_blank" 
                    href={'https://maps.google.com/?q=' + booking.place.address}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <h2>{booking.place.address}</h2>
                </a>
                <div className="bg-gray-200 p-5 my-6 rounded-2xl">
                    <h2 className="text-xl underline">Your Booking Information:</h2>
                    <div className="flex flex-row justify-between text-md items-center">
                        <div className="flex flex-row gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                            {differenceInCalendarDays(new Date(booking.checkOut) , new Date(booking.checkIn))} nights : 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                            </svg>
                            {format(new Date(booking.checkIn),'yyyy-MM-dd')} &rarr; 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                            </svg>
                            {format(new Date(booking.checkOut),'yyyy-MM-dd')}
                        </div>
                        <div className="bg-primary p-3 text-white rounded-2xl">
                            <div className=""> Total price</div>
                            <div className="text-3xl">Rs {booking.price}</div>
                        </div>
                    </div>
                </div>
                <PlaceGallery place={booking.place}/>
            </div>
            <ReviewsSection reviews={place.reviews || []} />
            <ReviewForm placeId={id} onAddReview={handleAddReview} />
        </div>
    )
}
