const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
console.log(req.body);
res.status(200).send('SignUp endpoint works!');
});

module.exports = router;