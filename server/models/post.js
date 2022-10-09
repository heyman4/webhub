const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    postedBy:{
        type: ObjectId,
        required:true,
        ref:"Users"
    },
    title: {
        type : String,
        required : true,
        
    },
    link : {
        type : String,
        required : true,
        unique : true,
    },
    date: {
        type : Date,
        required : true,
        
    },
    contributor : {
        type : String,
        
    },
    description: {
        type : String,
        required : true,
        
    }
    
})

mongoose.model("Post", postSchema)