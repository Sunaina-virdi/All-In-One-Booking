import { useContext, useEffect, useState } from "react";

import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberofGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    
    useEffect(() => {
        setCheckIn(today); // Set the default check-in date to today
    }, [today]);

    useEffect(() => {
      if(user){
        setName(user.name);
      }
    },[user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    function handleGuestChange(ev) {
        const value = parseInt(ev.target.value, 10);
        if (value <= place.maxGuests && value > 0) {
            setNumberOfGuests(value);
        } else {
            alert(`The maximum number of guests allowed is ${place.maxGuests}`);
        }
    }

    async function bookThisPlace() {
        const response = await axios.post('http://localhost:4000/account/bookings', {
          checkIn,checkOut,numberofGuests,name,phone,
          place:place._id,
          price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
        
       
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div className="bg-white shadow p-4 rounded-2xl">
            <h2 className="text-xl text-center mb-2">Price: Rs {place.price} /per night</h2>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                    <label>Check in : </label><br />
                    <input
                        type="date"
                        value={checkIn}
                        min={today} // Set the minimum date to today
                        onChange={ev => setCheckIn(ev.target.value)}
                    />
                    </div>
                    <div className="py-3 px-4 border-l">
                    <label>Check out : </label><br />
                    <input
                        type="date"
                        value={checkOut}
                        min={checkIn} // Ensure the check-out date is not before the check-in date
                        onChange={ev => setCheckOut(ev.target.value)}
                    />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests : </label><br />
                    <input
                    type="number"
                    className="border rounded-lg p-2 w-full"
                    value={numberofGuests}
                    // onChange={ev => setNumberOfGuests(ev.target.value)}
                    onChange={handleGuestChange}
                        max={place.maxGuests}
                    />
                </div>
            </div>
            {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
                <label>Your full name:</label>
                <input type="text"
                    className="border rounded-lg p-2 w-full"
                    value={name}
                    onChange={ev => setName(ev.target.value)}/>
                <label>Phone number:</label>
                <input type="tel"
                    className="border rounded-lg p-2 w-full"
                    value={phone}
                    onChange={ev => setPhone(ev.target.value)}/>
            </div>
            )}

            <button className="primary" onClick={bookThisPlace} >
                Book this place
                {numberOfNights > 0 && (
                    <span> Rs {numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}
