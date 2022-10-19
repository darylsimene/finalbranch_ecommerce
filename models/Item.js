const mongoose = require('mongoose')
const Schema = mongoose.Schema
//itemName
const ItemSchema = new Schema ({
    itemName: {
        type: String,
        required: true,
        maxlength: [15, 'Item name can not be more than 15 characters']
    },
    itemDescription:{
        type: String,
        required: true,
        maxlength: [15, 'Item description cant be more than 15 chars.']
    },
    gender:{
        type: String,
        required: true,
        enum: [
            'Male',
            'Female'  
        ]
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    isClearance: {
        type: Boolean,
        default: false
    },
    colors: {
        type: [String],
        required: true
    },
    sizes: {
        type: [String],
        required: true,
        enum: [
            'Small','Medium','Large','X-Large'
        ]
    }

}, {timestamps: true})


module.exports = mongoose.model('Item', ItemSchema)