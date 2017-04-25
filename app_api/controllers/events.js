var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.currentUserEvents = function(req, res) {
    congole.log("Create event API!");
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        Event
            .where('created_by', req.body)
            .exec(function(err, res) {
                res.status(200).json(res);
            });
    }
};