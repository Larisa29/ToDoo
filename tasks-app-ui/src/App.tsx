import './App.css';
import React, { useState } from 'react';

type Task = {
  id: number,
  title: string;
  content: string
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Going to the gym",
      content: "today i m gonna train my legs and glutes"
    },
    {
      id: 2,
      title: "Going to the gym",
      content: "today i m gonna train my biceps, tricpes, shoulders and back"
    },
    {
      id: 3,
      title: "!!! Going to the gym",
      content: "today i m gonna train my legs: quads and hammstrings "
    },
    {
      id: 4,
      title: "Going to the gym",
      content: "today i m gonna do some cardio workout"
    }
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setContent(task.content);
  }

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();

    const newTask: Task = {
      id: tasks.length + 1,
      title: title,
      content: content
    }

    setTasks([newTask, ...tasks]);
    setTitle("");
    setContent("");
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedTask) {
      return;
    }

    const updatedTask: Task = {
      id: selectedTask.id,
      title: title,
      content: content
    }

    const updatedTasksList = tasks.map((task) =>
      task.id === selectedTask.id
        ? updatedTask : task);

    setTasks(updatedTasksList);
    setTitle("");
    setContent("");
    setSelectedTask(null);
  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedTask(null);
  }

  const handleDeleteTask = (event: React.MouseEvent, taskId: number) => {
    event.stopPropagation();

    const updatedTasksList = tasks.filter(
      (task) => task.id !== taskId
    )

    setTasks(updatedTasksList);
  };

  return (
    <div className='app-container'>
      <form className='to-do-form' onSubmit={(event =>
        selectedTask ? handleUpdate(event) : handleAddTask(event))}>
        <input
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)}
          placeholder='Title' required></input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder='Content' rows={10} required></textarea>

        {selectedTask ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Task</button>
        )}
      </form>

      <div className='to-do-grid'>
        {tasks.map((task) => (
          <div
            className='task-item'
            onClick={() => handleTaskClick(task)}>
            <div className='task-header'>
              <button onClick={(event) => handleDeleteTask(event, task.id)}>X</button>
            </div>
            <h3>{task.title}</h3>
            <p>{task.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
