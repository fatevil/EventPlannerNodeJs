const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const User = mongoose.model('User');

module.exports.currentUserEvents = function(req, res) {
    //console.log("Check events API!");
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        Event
            .where('created_by', req.payload._id)
            .exec(function(err, data) {
                res.status(200).json(data);
            });
    }

};

module.exports.createRandomEvent = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const event = new Event();
        event.title = "hovno" + Math.random();
        event.created_by = "58f8c1786cced81fb81a6ae8";
        event.attending = [];

        event.save();
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                User.update({ _id: req.payload._id }, { $push: { attending_events: event._id } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                    res.status(200).json("{'message': 'ok' }");
                })
            });
    }
};

module.exports.createEvent = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        console.log(req.body);
        console.log(req.body.title);

        const event = new Event();
        event.title = req.body.title;
        event.created_by = req.payload._id;
        event.attending = [];

        event.save();
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                User.update({ _id: req.payload._id }, { $push: { attending_events: event._id } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                    res.status(200).json(event);
                })
            });

    }
};