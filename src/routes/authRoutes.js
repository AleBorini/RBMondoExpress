const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
try {
console.log(req.body);
const { email, password } = req.body;
const user = new User({ email, password });
await user.save();
res.status(201).send('User created successfully');
} catch (err) {
console.error(err);
res.status(500).send(err.message);
}   
});

module.exports = router;