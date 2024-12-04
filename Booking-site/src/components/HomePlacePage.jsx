import { useEffect, useState } from "react";
import { Navigate, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import ReviewsSection from "./ReviewsSection";
import ReviewForm from "./ReviewForm";

export default function HomePlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    const handleAddReview = (updatedReviews) => {
        setPlace((prev) => ({ ...prev, reviews: updatedReviews }));
    };

    if (!place) return '';

    return (
        <div className="mt-8 bg-gray-100 px-10 -mx-8 pt-8">
            <button onClick={() => navigate(-1)} className="flex gap-2 p-2 rounded-lg">
                {/* Back Button */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                 </svg>
            </button>
            <div className="max-w-[1140px] mx-auto">
                <h1 className="text-3xl">{place.title}</h1>
                <a
                    className="flex gap-1 my-3 font-semibold underline"
                    target="_blank"
                    href={'https://maps.google.com/?q=' + place.address}
                >
                    <h2>{place.address}</h2>
                </a>
                <PlaceGallery place={place} />
                <div className="mt-10 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        {/* description */}
                         <div className="my-4">
                             <h2 className="text-2xl font-semibold">Description</h2>
                             {place.description}
                         </div>
                         {/* check in check out */}
                         <span className="text-lg font-bold">Category: {place.category}</span><br/>
                         Check-in: {place.checkIn} <br/>
                         Check-out: {place.checkOut} <br/>
//                         Max number of guests : {place.maxGuests}
                    </div>
                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>
                <div className="bg-white -mx-8 p-8 border-t">
                    <h2 className="text-2xl font-semibold">Extra info</h2>
                    <p className="text-gray-700">{place.extraInfo}</p>
                </div>
                <ReviewsSection reviews={place.reviews || []} />
                <ReviewForm placeId={id} onAddReview={handleAddReview} />
            </div>
        </div>
    );
}
