const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    // check if the form contains all the neccessary fields
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    // create user and save it
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.place_address_lat = req.body.place_address_lat;
    user.place_address_lng = req.body.place_address_lng;
    user.searching_radius = req.body.searching_radius;
    user.place_address = req.body.place_address;
    user.attending_events = [];
    user.hosting_events = [];
    user.following = [];

    console.log(req.body);

    user.setPassword(req.body.password);

    user.save(function(err) {
        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });

    console.log(user);


};

module.exports.login = function(req, res) {

    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info) {
        let token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            //console.log(token);
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};