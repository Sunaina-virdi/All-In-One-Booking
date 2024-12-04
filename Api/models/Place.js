const mongoose = require('mongoose');
const PlaceSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title : String,
    address : String,
    photos : [String],
    description : String,
    facility : [String],
    extraInfo : String,
    checkIn: Number,
    checkOut: Number,
    maxGuests : Number,
    price: Number,
    category: {
        type: String,
        enum: ['hotel', 'castle', 'pool', 'shikara', 'villa'], // Add more categories as needed
        required: true,
        // default: 'hotel',
    },
    // 
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String, required: true }, // Name of the user who reviewed
            comment: { type: String, required: true }, // Review text
            rating: { type: Number, min: 1, max: 5, required: true }, // Rating out of 5
            createdAt: { type: Date, default: Date.now }, // Timestamp for the review
        }
    ],
    // 
});

const PlaceModel = mongoose.model('Place',PlaceSchema);

module.exports = PlaceModel;