const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
  try {

    const users = await User.find();

    const totalUsers = users.length;

    const admins = users.filter(
      user => user.role === 'Admin'
    ).length;

    const generalUsers = users.filter(
      user => user.role === 'General User'
    ).length;

    res.json({
      totalUsers,
      admins,
      generalUsers,
      users
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;