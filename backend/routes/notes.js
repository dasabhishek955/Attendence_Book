const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const data = require('../models/data')

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('name', 'Enter a student name'),
    body('roll_no', 'Enter a student roll_no'),
    body('description', 'Enter a student description'),
    body('depertment', 'Enter a student depertment'),
    body('sem', 'Enter a student sem')
], async (req, res) => {
    try {
        const { name, roll_no, description, depertment, sem } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            name, roll_no, description, depertment, sem, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { name, roll_no, description, depertment, sem } = req.body;
    try {
        // Create a newNote object
        console.log(req);
        const newNote = {};
        if (name) { newNote.name = name };
        if (roll_no) { newNote.roll_no = roll_no };
        if (description) { newNote.description = description };
        if (depertment) { newNote.depertment = depertment };
        if (sem) { newNote.sem = sem }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        // let note = await Note.findById({_id:'64a3d116e7aec66d092887b1'});
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Saving attendence data: DELETE "/api/notes/savednote". Login required
router.post('/savednote', [
    body('depertment', 'Enter the name of the depertment'),
    body('sem', 'Enter the name of the sem'),
    body('student_no', 'Enter the no of student present'),
], async (req, res) => {
    const { depertment, sem, student_no } = req.body;
    const note = new data({
        depertment: depertment, sem: sem, student_no: student_no
    })
    const savedNote = await note.save()
    res.json(note)
})
module.exports = router