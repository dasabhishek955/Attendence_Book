import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Noteitem = ({ checkboxes }) => {
    let navigate = useNavigate();
    const today = new Date();
    const host = "http://localhost:3013"
    const currentDate = today.toLocaleDateString();
    const { state } = useLocation();
    const { notes } = state;
    const [checkedCount, setCheckedCount] = useState(0);
    const handleChange = (e) => {
        const checkbox = e.target;
        if (checkbox.checked) {
            setCheckedCount(checkedCount + 1);
        } else {
            setCheckedCount(checkedCount - 1);
        }
    };

    const saveData = async (depertment, sem, student_no) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/savednote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ depertment, sem, student_no })
        });
        const data = await response.json();
        console.log(data);
    }

    const handleClick = (e) => {
        const student_no = checkedCount;
        const depertment = notes[0].depertment;
        const sem = notes[0].sem
        saveData(depertment, sem, student_no)
        navigate('/');
    }

    var temp = [];
    notes.map((note, checkbox, index) => {
        temp.push(<ul class="list-group">
            <li class="list-group-item">
                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" checked={checkbox.checked} onChange={handleChange} key={index} />
                <label class="form-check-label" for="firstCheckbox">
                    <ul class="list-group list-group-horizontal">
                        <li class="list-group-item">{note.name}</li>
                        <li class="list-group-item">{note.roll_no}</li>
                        <li class="list-group-item">{note.description}</li>
                        <li class="list-group-item">{note.depertment}</li>
                        <li class="list-group-item">{note.sem}</li>
                    </ul>
                </label>
            </li>
        </ul>);
    })
    return (
        <>
            <div>
                {temp}
            </div>
            <div>
                <h2>Number of student present at {currentDate} : {checkedCount}</h2>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button disabled={checkedCount <= 0} class="btn btn-primary" type="button" onClick={handleClick}>Submit</button>
            </div>

        </>
    )
}

export default Noteitem