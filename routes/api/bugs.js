const express = require("express");
const router = express.Router();
const Project = require('../../models/Project');
const Bug = require('../../models/Bug');
const passport = require('passport')
const validateBugInput = require('../../validation/bug');
const { json } = require("body-parser");

// report (create) a bug
route.post('/:project_id',passport.authenticate('jwt',{session: false}),async (req,res)=>{
    try{
        const {errors, isValid} = validateBugInput(req.body);
        if(!isValid){
        return res.status(400).json(errors);
        };
        //check the validality of project_id
        const project = await Project.findById(req.params.project_id);
        const newBug = new Bug({
            reporter: req.user.id,
            project: req.param.project_id,
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
// show the bug
// edit the bug
// show all bugs already in the project route
