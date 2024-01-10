const mongoose = require('mongoose');


// Create Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    bloodGroup: {
        type: String,
        trim: true
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model('Users', userSchema);

// Using Schema, create model