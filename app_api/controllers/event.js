var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.currentUserEVents = function(req, res) {
    console.log("Check events API!");
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        Event
            .where('created_by', req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }

};