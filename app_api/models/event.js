const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: Date,
    title: String,
    description: String,
    quick_description: String,
    place: String,
    place_link: String,
    place_address: String,
    place_address_lat: Number,
    place_address_lng: Number,
    place_location: String,
    price: String,
    category: String,
    image: String,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    attending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

mongoose.model('Event', eventSchema);