import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
            
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", ename: "", eroll_no: "", edescription: "", edepertment: "", esem: "" })
    console.log(notes)
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, ename: currentNote.name, eroll_no: currentNote.roll_no, edescription: currentNote.description, edepertment: currentNote.depertment, esem: currentNote.sem })
    }
    const handleClick = (e) => {
        editNote(note.id, note.ename, note.eroll_no, note.edescription, note.edepertment, note.esem)
        refClose.current.click();
        props.showAlert("updated Sucessfully", "success");
    }

    return (
        <>
        </>
    )
}

export default Notes
