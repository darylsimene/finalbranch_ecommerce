const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const RatingSchema = new Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }

})

//itemName
const ItemSchema = new Schema ({
    itemName: {
        type: String,
        required: true,
        maxlength: [150, 'Item name can not be more than 15 characters']
    },
    itemDescription:{
        type: String,
        required: true,
        maxlength: [150, 'Item description cant be more than 15 chars.']
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
        min: 0,
        validate: (price) => {
            return typeof price === "number"
        }
    },
    isClearance: {
        type: Boolean,
        default: false,
        validate: (isClearance) => {
            return typeof isClearance === "boolean"
        }
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
    },
    ratings: [RatingSchema],
    image:{
        type: String,
    }
}, {timestamps: true})

//pre-hook
ItemSchema.pre('save', function(next) {
    this.itemName = this.itemName.trim();
    this.itemDescription = this.itemDescription.trim();
    next()
})

// post hook
ItemSchema.post('save', function(){
    this.gender = this.gender.toUpperCase();
})

module.exports = mongoose.model('Item', ItemSchema)
