const mongoose = require('mongoose');

// Define the schema for a user
const UserSchema = new mongoose.Schema({
    // Name of the user
    name: { type: String, required: true },
    
    // Email of the user (must be unique)
    email: { type: String, required: true, unique: true },
    
    // mobile_no number of the user
    mobile_no: { type: String, required: true },
    
    // Password of the user (hashed)
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
