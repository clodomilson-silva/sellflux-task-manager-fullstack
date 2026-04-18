import { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const [reloadSignal, setReloadSignal] = useState(0);

  const handleTaskCreated = () => {
    setReloadSignal((current) => current + 1);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList reloadSignal={reloadSignal} />
    </div>
  );
}

export default App;