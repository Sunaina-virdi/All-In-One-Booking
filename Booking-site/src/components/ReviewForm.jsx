import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from 'axios';

export default function ReviewForm({ placeId, onAddReview }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const { user } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/places/${placeId}/reviews`,{
                userId: user._id,
                username: user.name,
                comment,
                rating,
            });
            onAddReview(response.data.reviews);
            setComment('');
            setRating(5);
        } catch (error) {
            console.error('Failed to add review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mt-5 mx-auto p-6 bg-gradient-to-br from-blue-100 to-blue-300 shadow-xl rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Add a Review</h2>
            <textarea
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required></textarea>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Rating:</label>
                <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}> {r} </option> ))}
                </select>
            </div>
            <button type="submit"
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200">
                Submit
            </button>
        </form>

    );
}
