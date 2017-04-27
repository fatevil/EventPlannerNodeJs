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
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profiles', auth, ctrlProfile.allProfilesRead);
router.get('/profile/:id', auth, ctrlProfile.profileReadById);


// events
router.get('/events', auth, ctrlEvent.allEvents);
router.get('/events/random', auth, ctrlEvent.createRandomEvent);
router.post('/events', upload.array(), auth, ctrlEvent.createEvent);
router.get('/event/:id', auth, ctrlEvent.getEvent);
router.get('/event/:id/attend', auth, ctrlEvent.attendEvent);
router.get('/event/:id/unattend', auth, ctrlEvent.unattendEvent);



// authentication
router.post('/register', upload.array(), ctrlAuth.register);
router.post('/login', upload.array(), ctrlAuth.login);

module.exports = router;