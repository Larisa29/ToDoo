import './App.css';
import React, { useEffect, useState } from 'react';

type Task = {
  id: number,
  title: string;
  content: string
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        console.log(response)
        const tasks: Task[] = await response.json();

        setTasks(tasks);

      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setContent(task.content);
  }

  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      )
      const newTask = await response.json();

      setTasks([newTask, ...tasks]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedTask) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${selectedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      )
      const updatedTask = await response.json();

      const updatedTasksList = tasks.map((task) =>
        task.id === selectedTask.id
          ? updatedTask : task);

      setTasks(updatedTasksList);
      setTitle("");
      setContent("");
      setSelectedTask(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedTask(null);
  }

  const handleDeleteTask = async (event: React.MouseEvent, taskId: number) => {
    event.stopPropagation();

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      )

      const updatedTasksList = tasks.filter(
        (task) => task.id !== taskId
      )

      setTasks(updatedTasksList);

    } catch (error) {
      console.log(error);
    }

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
