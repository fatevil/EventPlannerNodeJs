const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET', // TODO: REMOVE
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
router.get('/profile/:id/attending', auth, ctrlProfile.getAttendingEvents);
router.get('/profile/:id/hosting', auth, ctrlProfile.getHostingEvents);
router.get('/profile/:id/following', auth, ctrlProfile.getFollowedProfiles);
router.get('/profile/:id/follow', auth, ctrlProfile.followProfile);
router.get('/profile/:id/unfollow', auth, ctrlProfile.unfollowProfile);


// events
router.get('/events', auth, ctrlEvent.allEvents);
router.get('/events/upcoming', auth, ctrlEvent.upcomingEvents);
router.get('/events/:id/attending', auth, ctrlEvent.getPeopleWhoAttend);
router.get('/events/friends', auth, ctrlEvent.friendsEvents);
router.get('/events/byLocation', auth, ctrlEvent.eventsByLocation);
router.post('/events', upload.single('image'), auth, ctrlEvent.createEvent);
router.get('/event/:id', auth, ctrlEvent.getEvent);
router.get('/event/:id/attend', auth, ctrlEvent.attendEvent);
router.get('/event/:id/unattend', auth, ctrlEvent.unattendEvent);



// authentication
router.post('/register', upload.single('image'), ctrlAuth.register);
router.post('/login', upload.array(), ctrlAuth.login);

module.exports = router;