const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name must be provided"],
    },
    price:{
        type:Number,
        required:[true,"Product Price must be provided"],
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    company:{
        type:String,
        enum:{
            values:["ikea","caressa","liddy","marcos"],
            message:"{VALUE} is not Supported"
        }
    },
})

module.exports = mongoose.model('Product',productSchema)
