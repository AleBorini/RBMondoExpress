require('./models/user');
require('./models/track');
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://Follo:Follo@school-cluster-0.kxy8uw7.mongodb.net/?appName=School-Cluster-0"
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');


app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Hello ${req.user.email}`);
});


