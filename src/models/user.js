const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
password: { type: String, required: true },
email: { type: String, required: true, unique: true },
}, { timestamps: true });

const user = mongoose.model('User', userSchema);

module.exports = user;      