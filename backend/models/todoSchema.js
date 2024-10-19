const mongoose = require('mongoose'); 

var todoSchema = new mongoose.Schema({
    todo : {
        type : String,
        required : true
    },
    dueDate : {
        type : String,
        required : true
    },
    complete: {
        type: Boolean,
        default: false
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Todo', todoSchema)