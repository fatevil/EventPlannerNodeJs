var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    date: Date,
    title: String,
    place: String,
    place_link: String,
    place_address: String,
    place_location: String,
    price: Number,
    detail: String,
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