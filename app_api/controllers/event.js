const mongoose = require('mongoose');
const moment = require('moment');
const coordinates = require('../utils/coordinates');
const Event = mongoose.model('Event');
const User = mongoose.model('User');
// Load the core build.
const lodash = require('lodash/core');

module.exports.allEvents = function(req, res) {
    //console.log("Check events API!");
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        Event
            .find()
            .exec(function(err, data) {
                res.status(200).json(data);
            });
    }

};


module.exports.upcomingEvents = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const now = moment().format('x');
        Event
            .find({ date: { $gt: now } })
            .exec(function(err, data) {
                res.status(200).json(data);
            });
    }
};

module.exports.friendsEvents = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const userId = req.payload._id;


        User
            .findById(userId)
            .exec(function(err, user) {
                const followedPeople = user.following;
                User.find({ _id: { $in: followedPeople } })
                    .exec(function(err, users) {
                        const counted = users.reduce((counter, user) => {
                            if ('attending_events' in user) {
                                user.attending_events.forEach((event) => {
                                    if (!(event in counter)) {
                                        counter[event] = '1';
                                    } else {
                                        counter[event]++;
                                    }
                                });
                            }
                            return counter;
                        }, {});
                        const jsonek = JSON.stringify(counted);
                        console.log(counted);
                        console.log(jsonek);
                        res.status(200).json(jsonek);
                    });
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
                User.update({ _id: req.payload._id }, { $addToSet: { hosting_events: event._id } }, function(err, result) {
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
        const event = new Event();
        event.title = req.body.title;
        event.place_address = req.body.place_address;
        event.place_address_lat = req.body.place_address_lat;
        event.place_address_lng = req.body.place_address_lng;
        event.created_by = req.payload._id;
        event.attending = [req.payload._id];
        event.date = req.body.date;
        event.save();

        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                User.update({ _id: req.payload._id }, { $addToSet: { hosting_events: event._id, attending_events: event._id } },
                    function(err, result) {
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


module.exports.getEvent = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const eventId = req.params.id;
        Event
            .findById(eventId)
            .exec(function(err, event) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ "message": "Internall error" });
                    return;
                }
                res.status(200).json(event);
            });

    }
};


module.exports.attendEvent = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const eventId = req.params.id;
        const userId = req.payload._id;
        Event
            .findById(eventId)
            .exec(function(err, event) {
                Event.update({ _id: eventId }, { $addToSet: { attending: userId } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                })
            });

        User
            .findById(userId)
            .exec(function(err, user) {
                User.update({ _id: userId }, { $addToSet: { attending_events: eventId } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                    res.status(200).json(result);
                })
            });

    }
};


module.exports.unattendEvent = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const eventId = req.params.id;
        const userId = req.payload._id;
        Event
            .findById(eventId)
            .exec(function(err, event) {
                Event.update({ _id: eventId }, { $pull: { attending: userId } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                })
            });

        User
            .findById(userId)
            .exec(function(err, user) {
                User.update({ _id: userId }, { $pull: { attending_events: eventId } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                    res.status(200).json(result);
                })
            });

    }
};
module.exports.eventsByLocation = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {

        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                Event
                    .find()
                    .exec(function(err, events) {
                        const filteredEvents = events.filter((event) => {
                            const distance = coordinates.getDistance(event.place_address_lat,
                                event.place_address_lng,
                                user.place_address_lat,
                                user.place_address_lng);
                            const radius = user.searching_radius;
                            if (distance < radius) {
                                return true;
                            }
                            return false;
                        });
                        res.status(200).json(filteredEvents);
                    });
            });

    }

};