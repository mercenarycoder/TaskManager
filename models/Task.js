const mongoose = require('mongoose');

const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide the name'],
        trim:true,
        maxLength:[20, 'Please provide the maximum length']
    },
    completed:{
        type:Boolean,
        default:false
    },
});

module.exports=mongoose.model("Task",TaskSchema);