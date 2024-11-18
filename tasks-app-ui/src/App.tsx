import './App.css';
import React, { useState } from 'react';

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

  const [title, setTitle]= useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      console.log("title: ", title)
      console.log("content: ", content)

      const newTask: Note = {
         id:notes.length+1,
         title: title,
         content: content
      }

      setNotes([newTask, ...notes]);
      setTitle("");
      setContent("");
  };

 return (
  <div className='app-container'>
    <form className='to-do-form' onSubmit={(event => handleSubmit(event))}>
      <input 
        value = {title}
        onChange ={(event) =>
        setTitle(event.target.value)}
        placeholder='Title' required></input>
      <textarea 
        value = {content}
        onChange = {(event) => setContent(event.target.value)}
        placeholder='Content' rows={10} required/>

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
