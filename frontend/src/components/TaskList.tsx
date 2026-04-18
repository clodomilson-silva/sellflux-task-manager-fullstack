import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = () => {
    api.get('/tasks').then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refresh={fetchTasks} />
      ))}
    </div>
  );
};