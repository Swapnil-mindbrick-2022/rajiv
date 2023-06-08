const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
    Name:{
        type:String,
        required: true,
    },
    Age:{
        type:String,
        required: true,
    },
    Mobileno:{
        type:Number,
        required:true
    },

    District:{
        type:String,
        required:true
    },
    Area:{
        type:String,
        required:true
    },

    interested:{
        type:String,
        required:true
    },
    date :{ type : Date, default: Date.now }
})
users= mongoose.model('User',userSchema);
module.exports = users


