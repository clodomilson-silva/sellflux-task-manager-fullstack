import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  reloadSignal: number;
};

export const TaskList = ({ reloadSignal }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');

  const fetchTasks = () => {
    api
      .get('/tasks')
      .then((res) => {
        setTasks(res.data);
        setError('');
      })
      .catch((err: any) => {
        setError(err?.response?.data?.error || 'Nao foi possivel carregar tarefas.');
      });
  };

  useEffect(() => {
    fetchTasks();
  }, [reloadSignal]);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refresh={fetchTasks} />
      ))}
    </div>
  );
};