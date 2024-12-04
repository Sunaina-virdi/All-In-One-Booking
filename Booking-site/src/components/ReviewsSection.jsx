export default function ReviewsSection({ reviews }) {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="border-b py-4">
                        <h3 className="font-bold">{review.username}</h3>
                        <div className="text-sm text-gray-600">{review.comment}</div>
                        <div className="text-yellow-500">Rating: {review.rating} / 5</div>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
}
