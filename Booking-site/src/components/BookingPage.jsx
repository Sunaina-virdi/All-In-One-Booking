import { useEffect,useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function BookingPage(){
    const [bookings,setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    },[])
    return (
        <div>
            My bookings
            <AccountNav />
            <div>
                {/* {bookings?.length > 0 && bookings.map(booking => ( */}
                {/* <PlaceImg place={bookings.place} />
                    <div>
                        {bookings.checkIn} {bookings.checkOut}
                    </div> */}
                {/* ))} */}
            </div>
        </div>
    )
}