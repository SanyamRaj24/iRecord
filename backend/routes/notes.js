const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Get all notes using: GET 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try{
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Add a new note using POST
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote);
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//Update an existing note: PUT. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try{
        const {title,description,tag}=req.body;
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
    
        let note= await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Note Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
        res.json({note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Delete a note using using DELETE. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try{
        let note= await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Sucess":"Note has been deleted", note: note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Servor Error");
    }
})
module.exports = router