// Has routes that have anything to do with profiles, fetching them, adding them, updating them etc

const express = require('express');
router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private --> becuase were getting the profile by the usre id thats inside the token (bring in the auth middleware)
// add auth as a second parameter to routes that we want to protect
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name,avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
