var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const multer = require('multer');
const upload = multer({
    dest: 'public/images/',
});

var ctrlProfile = require('../controllers/profile');
var ctrlEvents = require('../controllers/events');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profile/events', auth, ctrlEvents.currentUserEvents);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', upload.array(), ctrlAuth.login);

module.exports = router;