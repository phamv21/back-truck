const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    bug: {
        type: Schema.Types.ObjectId,
        ref: 'Bug',
        require: true,
    },
    replies:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    content:{
        type: String,
        require: true
    },
    timestamps: true


})
module.exports = Comment = mongoose.model('Comment',CommentSchema);