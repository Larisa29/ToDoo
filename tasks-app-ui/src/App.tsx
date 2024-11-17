import './App.css';
import { useState } from 'react';

type Note = {
  id: number,
  title: string;
  content:string
}

const App = () =>{
  const [notes, setNotes] = useState<Note[]>([
    {
      id:1,
      title:"Going to the gym",
      content: "today i m gonna train my legs and glutes"
    },
    {
      id:2,
      title:"Going to the gym",
      content: "today i m gonna train my biceps, tricpes, shoulders and back"
    },
    {
      id:3,
      title:"!!! Going to the gym",
      content: "today i m gonna train my legs: quads and hammstrings "
    },
    {
      id:4,
      title:"Going to the gym",
      content: "today i m gonna do some cardio workout"
    }
  ]);
 return (
  <div className='app-container'>
    <form className='to-do-form'>
      <input placeholder='Title' required></input>
      <textarea placeholder='Content' rows={10} required/>

      <button type="submit">Add Note</button>
    </form>
    <div className='to-do-grid'>
      {notes.map((note) => (
            <div className='note-item'>
        <div className='note-header'>
          <button>X</button>
        </div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
      ))}

  

    </div>
  </div>
 )
}

export default App;
