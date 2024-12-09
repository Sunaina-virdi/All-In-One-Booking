export default function ReviewsSection({ reviews }) {
    return (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-100 to-blue-300 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="p-4 mb-4 border rounded-lg bg-gray-50 shadow-sm" >
                        <h3 className="font-bold text-lg mb-2">{review.username}</h3>
                        <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                        <div className="text-yellow-500 font-semibold">
                            Rating: {review.rating} / 5
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No reviews yet.</p>
            )}
        </div>
    );
}
