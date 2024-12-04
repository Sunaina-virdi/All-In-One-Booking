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
        <form onSubmit={handleSubmit} className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
            <textarea
                className="w-full border p-2 rounded"
                placeholder="Write your review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            ></textarea>
            <div className="flex gap-2 mt-2">
                <label className="font-semibold">Rating:</label>
                <select
                    className="border rounded p-1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit
            </button>
        </form>
    );
}
