const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const multer = require('multer');
const upload = multer({
    dest: 'public/images/',
});
const ctrlEvent = require('../controllers/event');
const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');

// profile
router.get('/events', auth, ctrlEvent.currentUserEvents);
router.get('/profile', auth, ctrlProfile.profileRead);

// event
//router.post('/events', auth, ctrlEvent.currentEvents);


// authentication
router.post('/register', upload.array(), ctrlAuth.register);
router.post('/login', upload.array(), ctrlAuth.login);

module.exports = router;