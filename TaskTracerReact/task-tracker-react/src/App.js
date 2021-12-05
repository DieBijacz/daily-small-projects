import {useState} from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(
    [{
        id: 1,
        text: 'learning programing',
        day: 'everyday',
        reminder: true,
    },
    {
        id: 2,
        text: 'trying to survive another dat',
        day: 'every single day',
        reminder: true,
    },
    {
        id: 3,
        text: 'start recat',
        day: '04.12.2021',
        reminder: false,
    }]
  )
  // ==================Add Task===================
  const addTask = (task) => {
    //get random id number
    const id = Math.floor(Math.random() * 10000) + 1
    //create new task with random id and passed task(tetx, day, reminder)
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // =================Delete Task=================
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // ===============Toggle Reminder===============
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => 
        setShowAddTask(!showAddTask)}
        showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? 
        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>)
        : ('nothing')}
    </div>
  );
}

export default App;
