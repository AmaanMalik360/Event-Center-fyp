
const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    
    type:{
      type: String,
      required: true  
    },

    date:{
        type: String,
        required: true
    },

    time:{
        type: String,
        required: true
    },
    
    guests:{
        type: Number,
        required: true
    },

    venue:{
        type: String,
        required: true
        
    },

    waitors:{
        type: Number,
    },

    budget:{
        type: Number,
        required: true
    },

    postedBy:{
            type: String,
            required: true
    },
    
    dishes:[""],

    decors:{
        type: Array
    },

    responses:{
        type: Array,
        
    },
    
    cost:{
        type: Number
        // required: true
    },
    
    
    posted: {
        type: Boolean
    },

    setupPictures:[
        {
            img:{
                type: String
            }
        }
    ],

},
{
    timestamps: true
})


module.exports = mongoose.model("Events", eventSchema)