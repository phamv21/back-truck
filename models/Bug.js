const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BugSchema = new Schema({
    reporter:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    maintainer:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },

    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        require: true
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    category:{
        type: String,
        default:'other'
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
        default: 'minor'
    },
    summary:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true
    },
    reproduce:{
        type: String,

    },
    timestamps: true
})

module.exports = Bug = mongoose.model('Bug',BugSchema)