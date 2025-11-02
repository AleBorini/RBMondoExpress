const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://Follo:Follo@school-cluster-0.kxy8uw7.mongodb.net/?appName=School-Cluster-0"
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


