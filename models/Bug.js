const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BugSchema = new Schema({
    reporter:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        require: true
    },
    category:{
        type: String,
        default:'unclassify'
    },
    status:{
        type: String,
        default:'unassigned'
    },
    piority:{
        type: String,
        default:'normal'
    },
    severity:{
        type: String,
        default: 'normal'
    },
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true
    },
    
})

module.exports = Bug = mongoose.model('Bug',BugSchema);