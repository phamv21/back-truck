const express = require("express");
const router = express.Router();
const Project = require('../../models/Project');
const Bug = require('../../models/Bug');
const passport = require('passport')
const validateProjectInput = require('../../validation/project');
const { json } = require("body-parser");

// protect the post route from unauthenticated user, or non manager 
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors,isValid} = validateProjectInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    if (req.user.permission != 'manager'){
       return res.status(400).json({permission:'action beyond your permission'});
    }
    const newProject = new Project({
        title: req.body.title,
        author: req.user.id
    });
    newProject.save().then(project => res.json(project));
});
// get all the project
router.get('/',(req,res)=>{
    Project.find()
    .sort({updateAt: -1})
    .then(projects => res.json(projects))
    .catch(err=> res.status(400).json({noprejectsfound:'No Projects Found'}));
});
// show the progress of the projects
// the logic here is to show the assigned bug to the project 
// and count the percent of it has status as finish
router.get('/:id/progress',async(req,res)=>{
    try{
        const prj = await Project.findById(req.params.id)
        const assinedBugs = await Bug.find({'project._id':prj.id,status:'assigned'});
        const resolvedBugs = await Bug.find({'project._id':prj.id,status:'resolved'});
        return res.json({assinedBugs,resolvedBugs})
    }
    catch(err){
       return res.status(400).json({noprejectsfound:'No Project Found'})
    }
    

})
//show all the bug in the project
router.get('/:id/bugs',async(req,res)=>{
    try{
        const prj = await Project.findById(req.params.id)
        const assinedBugs = await Bug.find({'project._id':prj.id,status:'assigned'});
        const unassignedBugs = await Bug.find({'project._id':prj.id,status:'unassigned'});

        return res.json({assinedBugs,unassignedBugs,resolvedBugs})
    }
    catch(err){
       return res.status(400).json({noprejectsfound:'No Project Found'})
    }
    

})






module.exports = router;