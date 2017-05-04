const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');

module.exports.profileRead = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }

};
module.exports.getFollowedProfiles = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const userId = req.params.id;
        User
            .findById(userId)
            .exec(function(err, user) {
                const followed_users = user.following;
                User.find({
                        _id: {
                            $in: followed_users
                        }
                    })
                    .exec(function(err, users) {
                        res.status(200).json(users);
                    });
            });

    }
};
module.exports.getAttendingEvents = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const userId = req.params.id;
        User
            .findById(userId)
            .exec(function(err, user) {
                const attended_events = user.attending_events;
                Event.find({
                        _id: {
                            $in: attended_events
                        }
                    })
                    .exec(function(err, events) {
                        res.status(200).json(events);
                    });
            });

    }
};


module.exports.getHostingEvents = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const userId = req.params.id;
        User
            .findById(userId)
            .exec(function(err, user) {
                const hosting_events = user.hosting_events;
                if (hosting_events.lenght < 1) {
                    res.status(200).json("[]");
                    return;
                }
                Event.find({
                        _id: {
                            $in: hosting_events
                        }
                    })
                    .exec(function(err, events) {
                        res.status(200).json(events);
                    });
            });
    }
}
module.exports.profileReadById = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const eventId = req.params.id;
        User
            .findById(eventId)
            .exec(function(err, user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                console.log(err);
            });
    }
}

module.exports.allProfilesRead = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const eventId = req.params.id;
        User
            .find()
            .exec(function(err, users) {
                res.status(200).json(users);
            });
    }

};

module.exports.followProfile = function(req, res) {
    const userId = req.params.id;
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else if (req.payload._id == userId) {
        res.status(401).json({
            "message": "UnauthorizedError: user can't follow himself"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                User.update({ _id: req.payload._id }, { $addToSet: { following: userId } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                    res.status(200).json(result);
                })
            });
    }

}


module.exports.unfollowProfile = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        const userId = req.params.id;
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                User.update({ _id: req.payload._id }, { $pull: { following: userId } }, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Internall error" });
                        return;
                    }
                    res.status(200).json(result);
                })
            });
    }

}