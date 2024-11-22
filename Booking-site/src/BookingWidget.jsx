import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberofGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
      if(user){
        setName(user.name);
      }
    },[user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
          checkIn,checkOut,numberofGuests,name,phone,
          place:place._id,
          price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }
    // async function bookThisPlace() {
    //     try {
    //         const response = await axios.post('/bookings', {
    //           checkIn, checkOut, numberofGuests, name, phone,
    //           place: place._id,
    //           price: numberOfNights * place.price,
    //         });
    
    //         const bookingId = response.data._id;
    //         setRedirect(`/account/bookings/${bookingId}`);
    //     } catch (err) {
    //         console.error('Error creating booking:', err);
    //     }
    // }
    

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div className="bg-white shadow p-4 rounded-2xl">
            <h2 className="text-xl text-center mb-2">Price:${place.price} /per night</h2>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4 ">
                        <label>Check in : </label><br/>
                        <input type="date" value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)}/>
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out : </label><br/>
                        <input type="date" value={checkOut} 
                            onChange={ev => setCheckOut(ev.target.value)}/>
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests : </label><br/>
                    <input type="number" className="border rounded-lg p-2 w-full"
                        value={numberofGuests} 
                        onChange={ev => setNumberOfGuests(ev.target.value)}/>
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

            <button className="primary" onClick={bookThisPlace}  type="button">
                Book this place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}
