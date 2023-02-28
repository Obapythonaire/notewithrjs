import React, {useEffect, useState} from 'react'
// import notes from '../assets/data'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {


    const {id} = useParams();
    const history = useNavigate();
    // const note = notes.find(note =>note.id===Number(id))
    let [note, setNote] = useState(null)
    // console.log("props:", props.match.params.id)
    // console.log("ID:", id, "History:", history)
    useEffect(() => {
        getNote()
    }, [id, history])

    let getNote = async () => {
        if (id ==='new') return
        let response = await fetch(`http://localhost:8000/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }


    let createNote = async () =>{
        await fetch(`http://localhost:8000/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
        
    }

    let updateNote = async () =>{
        await fetch(`http://localhost:8000/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
        
    }

    let deleteNote = async () =>{
        await fetch(`http://localhost:8000/notes/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history('/');
    }

    let handleSubmit = () =>{
        // Adding feature to delete the note if its content is empty
        if (id !=='new' && !note.body){
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note !==null) {
            createNote()
        }else {
            updateNote()
        }
        // updateNote()
        // Below was formerly used in react
        // history.push('/')    
        // Below is the new function that replaced history "useNavaigate"  
        history('/');
    }
  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/" >
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            {id !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ) : (
                <button onClick={handleSubmit}>Done</button>
            )}

            
        </div>
        <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} value={note?.body}>

        </textarea>
        {/* <p>{note.body}</p> */}
        {/* <h1>This is a single note page</h1> */}
    </div>
  )
}

export default NotePage