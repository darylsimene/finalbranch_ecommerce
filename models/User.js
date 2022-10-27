const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, 'Please add a username.'],
        maxLength: [15, 'UN cant be more than 15 chars'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        validate: (email) => {
            return validator.isEmail(email)
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate: (password) => {
            return validator.isStrongPassword(password)
        }
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type: Date
    },
    admin:{
        type: Boolean,
        default:false,
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

//bycrypt - prehook to hash our password before saving to the database
UserSchema.pre('save', async function(next){
     if (!this.isModified('password')) next();

     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
})

//generate our jwt token when user logs in or creates a new account
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// method to matchthe password for login
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema);