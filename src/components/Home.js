
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
console.log(localStorage.getItem('token'));
export const Home = (props) => {
    let navigate = useNavigate();
    const host = "http://localhost:3013"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    useEffect(() => {
        getNotes()
    }, [])
    const handleCseClick = () => {
        console.log(notes);
        const sortNote = []
        for (let index = 0; index < notes.length; index++) {
            if (notes[index].depertment === "CSE") {
                sortNote.push(notes[index]);
            }
        }
        navigate('/cdev', { state: { notes: sortNote } });
    }
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    const handleItClick = async () => {
        const sortNote = []
        for (let index = 0; index < notes.length; index++) {
            if (notes[index].depertment === "IT") {
                sortNote.push(notes[index]);
            }
        }
        navigate('/cdev', { state: { notes: sortNote } });
    }
    return (
        <>
            <div className="container d-flex justify-content-between">
                <button type="button" className="btn btn-dark" onClick={handleCseClick}> CSE </button>
                <button type="button" className="btn btn-dark" onClick={handleItClick}> IT </button>
            </div>
        </>
    )
}
