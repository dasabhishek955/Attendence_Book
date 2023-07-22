import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Cdev = (props) => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const { notes } = state;
    const handle1Click = () => {
        const sortNote = []
        for (let index = 0; index < notes.length; index++) {
            if (notes[index].sem === "1st") {
                sortNote.push(notes[index]);
            }
        }
        navigate('/noteitem', { state: { notes: sortNote } });
    }
    const handle2Click = () => {
        const sortNote = []
        for (let index = 0; index < notes.length; index++) {
            if (notes[index].sem === "2nd") {
                sortNote.push(notes[index]);
            }
        }
        navigate('/noteitem', { state: { notes: sortNote } });
    }

    return (
        <div>

            <div className="container d-flex justify-content-between">
                <button type="button" className="btn btn-dark" onClick={handle1Click}> 1ST </button>
                <button type="button" className="btn btn-dark" onClick={handle2Click}> 2ND </button>
            </div>
        </div>
    )
}

export default Cdev
