const mongoose = require('mongoose');
const moment = require('moment');
const coordinates = require('../utils/coordinates');
const images = require('../utils/images');
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
            .find({
                date: {
                    $gt: now
                }
            })
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
                User.find({
                        _id: {
                            $in: followedPeople
                        }
                    })
                    .exec(function(err, users) {
                        const counted = users.reduce((counter, user) => {
                            if ('attending_events' in user) {
                                user.attending_events.forEach((event) => {
                                    if (!(event in counter)) {
                                        counter.push(event);
                                    }
                                });
                            }
                            return counter;
                        }, []);

                        Event.
                        find({
                                _id: {
                                    $in: counted
                                }
                            })
                            .exec(function(err, events) {
                                res.status(200).json(events);
                            });
                    });
            });

    }
};

module.exports.createEvent = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const originalFile = 'images/' + req.file.filename;
        const headerFile = images.saveImageEventHeader(req.file.filename, req.file.path);
        const sliderImage = images.saveImageEventSlider(req.file.filename, req.file.path);

        const event = new Event();
        event.title = req.body.title;
        event.place_address = req.body.place_address;
        event.place_address_lat = req.body.place_address_lat;
        event.place_address_lng = req.body.place_address_lng;
        event.created_by = req.payload._id;
        event.attending = [req.payload._id];
        event.date = req.body.date;
        event.image = originalFile;
        event.sliderImage = sliderImage;
        event.headerImage = headerFile;
        event.description = req.body.description;
        event.price = req.body.price;
        event.category = req.body.category;
        event.quick_description = req.body.quickDescription;
        event.save();

        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                User.update({
                        _id: req.payload._id
                    }, {
                        $addToSet: {
                            hosting_events: event._id,
                            attending_events: event._id
                        }
                    },
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                "message": "Internall error"
                            });
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
                    res.status(500).json({
                        "message": "Internall error"
                    });
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
                Event.update({
                    _id: eventId
                }, {
                    $addToSet: {
                        attending: userId
                    }
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            "message": "Internall error"
                        });
                        return;
                    }
                })
            });

        User
            .findById(userId)
            .exec(function(err, user) {
                User.update({
                    _id: userId
                }, {
                    $addToSet: {
                        attending_events: eventId
                    }
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            "message": "Internall error"
                        });
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
                Event.update({
                    _id: eventId
                }, {
                    $pull: {
                        attending: userId
                    }
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            "message": "Internall error"
                        });
                        return;
                    }
                })
            });

        User
            .findById(userId)
            .exec(function(err, user) {
                User.update({
                    _id: userId
                }, {
                    $pull: {
                        attending_events: eventId
                    }
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            "message": "Internall error"
                        });
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
        const now = moment().format('x');

        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                Event
                    .find({
                        date: {
                            $gt: now
                        }
                    })
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
module.exports.getPeopleWhoAttend = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const eventId = req.params.id;

        Event
            .findById(eventId)
            .exec(function(err, user) {
                Event
                    .findById(eventId)
                    .exec(function(err, event) {
                        console.log(event);
                        if (err) {
                            res.status(500).json({
                                "message": "Internal error"
                            });
                        }
                        User
                            .find({ _id: { $in: event.attending } })
                            .exec(function(err, users) {
                                console.log(users);
                                res.status(200).json(users);
                            });
                    });
            });

    }

};