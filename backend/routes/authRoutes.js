const express = require('express');

const router = express.Router();

const User = require('../models/User');

router.post('/login', async (req, res) => {

  const { username, password, role } = req.body;

  try {

    const user = await User.findOne({
      email: username,
      password,
      role
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;
