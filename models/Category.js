const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema ({
    category: {
        type: String,
        required: [true, 'Please add a category'],
        unique: true,
        trim: true,
        maxLength: [15, '15+ characters are not allowed']
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
        enum:[
            'Male',
            'Female'
        ]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', CategorySchema)