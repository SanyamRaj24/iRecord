import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const { notes, getNotes, editNote } = useContext(noteContext);
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currNote) => {
        ref.current.click();
        setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
    }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                {notes.length !== 0 && <h2>Your Notes</h2>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
