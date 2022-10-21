const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId, 
        ref:'User',
        require: true
    },
        
    title: {
        type: String,
        require: true,
        unique: true,
    },
    timestamps: true

})

module.exports = Project = mongoose.model('Project',ProjectSchema);