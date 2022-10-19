const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, 'Please add a username.'],
        maxLength: [15, 'UN cant be more than 15 chars'],
    },
    email: {
        type: String,
        required: [true, 'Please add a pw']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    gender:{
        type: String,
        required: [true, 'Please enter a gender'],
        enum: [
            'Male', 'Female'
        ]
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema);