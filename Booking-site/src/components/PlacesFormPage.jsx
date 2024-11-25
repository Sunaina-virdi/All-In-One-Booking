import PhotosUploader from "../PhotosUploader";
import Facility from "../Facility";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function PlacesFormPage(){
    const { user } = useContext(UserContext);
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [facility,setFacility] = useState('');
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setmaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [category,setCategory] = useState('');
    const [redirect,setRedirect] = useState(false);
    
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setFacility(data.facility);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setmaxGuests(data.maxGuests);
            setPrice(data.price);
            setCategory(data.category);
        });
    }, [id]);

    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4 mb-2">{text}</h2>
        )
    }

    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm mb-2">{text}</p>
        );
    }

    function preInput(header,description){
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();

        if (!category) {
            alert('Please select a category for your place.');
            return;
        }

        const placeData = {
          title, address, addedPhotos,
          description, facility, extraInfo,
          checkIn, checkOut, maxGuests,price,category,
        };
        if (id) {
          // update
          await axios.put('/places', {
            id, ...placeData
          });
          setRedirect(true);
        } else {
          // new place
          await axios.post('/places', placeData);
          setRedirect(true);
        }
    
      }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return(
        <div className=" w-full mx-auto mt-8">
            <AccountNav role={user?.role}/>
            <form onSubmit={savePlace} className="max-width lg:w-[1090px] md:w-[600px] mx-auto" >

                {preInput('Title','Title for your place. Should be short and catchy as in advertisement')}
                <input className="outline-none bg-slate-100 w-full p-2 rounded-lg" type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
                
                {preInput('Address','Address to your place')}
                <input className="outline-none bg-slate-100 w-full p-2 rounded-lg" type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
                
                {/*  */}
                {preInput('Category', 'Select the category of your place')}
                <select
                className="outline-none bg-slate-100 w-full p-2 rounded-lg"
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}>
                    <option value="" disabled>Select a category</option>
                    <option value="hotel">Hotel</option>
                    <option value="castle">Castle</option>
                    <option value="pool">Pool</option>
                    <option value="shikara">Shikara</option>
                    {/* <option value="apartment">Apartment</option> */}
                    <option value="villa">Villa</option>
                </select>

{/*  */}

                {preInput('Photos','more for better experience')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                
                {preInput('Description','description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="outline-none bg-slate-100 w-full h-24 rounded-xl"/>

                {preInput('Facility','select all the facility pf your place')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Facility selected={facility} onChange={setFacility}/>
                </div>

                {preInput('Extra info','places rules,etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className="outline-none bg-slate-100 w-full h-24 rounded-xl"/>

                {preInput('Check in&out times','add check in and out times,remember to have some time window for cleaning the room between guests')}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div>
                        <h3>Check in time</h3>
                        <input className="outline-none bg-slate-100 w-full p-2 rounded-lg mt-2 -mb-1" 
                        value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                        type="text" placeholder="14:00"/>
                    </div>
                    <div>
                        <h3>Check out time</h3>
                        <input className="outline-none bg-slate-100 w-full p-2 rounded-lg mt-2 -mb-1" 
                        value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                        type="text" placeholder="11:00"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input className="outline-none bg-slate-100 w-full p-2 rounded-lg mt-2 -mb-1" 
                        type="text" value={maxGuests} onChange={ev => setmaxGuests(ev.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input className="outline-none bg-slate-100 w-full p-2 rounded-lg mt-2 -mb-1" 
                        type="text" value={price} onChange={ev => setPrice(ev.target.value)}/>
                    </div>
                </div>
                <button className="primary mt-4">Save</button>
            </form>
        </div>
    )
}