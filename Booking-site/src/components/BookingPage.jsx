import { useEffect,useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { format, differenceInCalendarDays } from 'date-fns';
import {Link} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function BookingPage(){
    const { user } = useContext(UserContext);
    const [bookings,setBookings] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/bookings').then(response => {
            setBookings(response.data);
        })
    },[]);
    return (
        <div className="bg-bg1 px-8 h-screen">
            <AccountNav role={user?.role}/>
            <h1 className="text-2xl font-serif font-semibold text-center text-white">My bookings</h1>
            <div className="mt-8 ">
                {bookings?.length > 0 ? (
                    bookings.map(booking => (
                        <Link 
                            to={`/account/bookings/${booking._id}`} 
                            className="flex gap-4 mb-4 bg-bg3 rounded-2xl overflow-hidden"
                            key={booking._id}>
                            <div className="w-48 h-40">
                                <PlaceImg place={booking.place} />
                            </div>
                            <div className="py-3 pr-3 grow text-white">
                                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                                <div className="flex gap-2 border-t border-black mt-2 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                                    </svg>
                                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                                </div>
                                <div className="flex gap-2 text-xl items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>
                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights | 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                    Total price: Rs {booking.price} /-
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex items-center justify-center">
                        <div className="text-center mt-16 border p-5 shadow-gary-500 bg-gradient-to-br from-blue-100 to-blue-300 shadow-xl rounded-lg">
                            <h2 className="text-2xl font-semibold">No trips booked... yet!</h2>
                            <p className="text-gray-500 mt-2">Time to dust off your bags and start planning your next adventure</p>
                            <Link to="/" className="inline-block mt-4 px-6 py-2 text-white bg-primary rounded-full">
                                Start Searching
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}