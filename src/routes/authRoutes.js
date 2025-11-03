const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
try {
console.log(req.body);
const { email, password } = req.body;
const user = new User({ email, password });
await user.save();
const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
res.status(201).send({ token });
console.log('User signed up successfully');
} catch (err) {
console.error(err);
res.status(500).send(err.message);
}   
});



router.post('/signin', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) {
  return res.status(401).send('Email and password are required');       
}
const user = await User.findOne({ email });
if (!user) {
    return res.status(401).send('Invalid email or password');
}
try {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
} catch (err) {
    return res.status(401).send('Invalid email or password');
}
} catch (err) {
    return res.status(500).send('Server error');
}
});

module.exports = router;