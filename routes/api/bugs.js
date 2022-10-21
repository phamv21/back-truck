const express = require("express");
const router = express.Router();
const Project = require('../../models/Project');
const Bug = require('../../models/Bug');
const passport = require('passport')
const validateBugInput = require('../../validation/bug');
const validateBugUpdateInput = require('../../validation/update_bug');
const { json } = require("body-parser");
const User = require("../../models/User");

// report (create) a bug
router.post('/:project_id',passport.authenticate('jwt',{session: false}),async (req,res)=>{
    try{
        const {errors, isValid} = validateBugInput(req.body);
        if(!isValid){
        return res.status(400).json(errors);
        };
        //check the validality of project_id
        const project = await Project.findById(req.params.project_id);
        const newBug = new Bug({
            reporter: req.user.id,
            project: req.params.project_id,
            category: req.body.category,
            piority: req.body.piority,
            serverity: req.body.serverity,
            summary: req.body.summary,
            description: req.body.description,
            reproduce: req.body.reproduce
        });
        return res.json(await newBug.save());

    }
    catch(err){
        return res.status(400).json({noprejectsfound:'No Project Found'})
    }



})
//show all the bug in a project is in the project route already

// show a bug
router.get('/:id',async(req,res)=>{
    try{
        const bug =  await Bug.findById(req.params.id)
        return res.json(bug);

    }
    catch(err){
        return res.status(400).json({noBugReportFound:'No Bug Report Found'})
    }
})

// edit the bug - only the manager or the owner can edit the bug
router.patch('/:id',passport.authenticate('jwt',{session: false}),async (req,res)=>{
    try{
     // if the editor is the manager (3 kinds = reporter manager developer)
     const currentUser = await User.findById(req.user.id);
     const currentBug = await Bug.findById(req.params.id);
     if(currentBug.reporter._id != req.user.id && (currentUser.permission == 'manager' || currentUser.permission == 'developer')){
        const {errors,isValid} = validateBugUpdateInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        }
        const updatedBug = await currentBug.update({$set:{
            status: req.body.status,
            serverity: req.body.serverity
        }})
        return res.json(updatedBug);
     }
     // The developer and manager have full control on their post
     if(currentBug.reporter._id == req.user.id && (currentUser.permission == 'manager' || currentUser.permission == 'developer')){
        const {errors, isValid} = validateBugInput(req.body);
        const {errors2,isValid2} = validateBugInput(req.body);

        if(!isValid || !isValid2){
        return res.status(400).json({...errors,...errors2});
        };
        const updatedBug = await currentBug.update({$set:{
            status: req.body.status,
            serverity: req.body.serverity,
            category: req.body.category,
            piority: req.body.piority,
            serverity: req.body.serverity,
            summary: req.body.summary,
            description: req.body.description,
            reproduce: req.body.reproduce
        }});
        return res.json(updatedBug);
     }


     if(currentBug.reporter._id == req.user.id){ // author of the bug report is the current user
        const {errors, isValid} = validateBugInput(req.body);
        if(!isValid){
        return res.status(400).json(errors);
        };
        const updatedBug = await currentBug.update({$set:{
            category: req.body.category,
            piority: req.body.piority,
            serverity: req.body.serverity,
            summary: req.body.summary,
            description: req.body.description,
            reproduce: req.body.reproduce
        }});
        return res.json(updatedBug);


     }




    }
    catch(err){
        return res.status(400).json({noBugReportFound:'No Bug Report Found'})
    }
})




module.exports = router;
