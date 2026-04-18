import { useState } from 'react';
import { api } from '../services/api';
import { Task } from '../types';
import { Comments } from './Comments';

type TaskItemProps = {
  task: Task;
  refresh: () => void;
};

export const TaskItem = ({ task, refresh }: TaskItemProps) => {
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState('');

  const toggleTask = () => {
    api
      .patch(`/tasks/${task.id}`)
      .then(() => {
        setError('');
        refresh();
      })
      .catch((err: any) => {
        setError(err?.response?.data?.error || 'Nao foi possivel atualizar tarefa.');
      });
  };

  const deleteTask = () => {
    api
      .delete(`/tasks/${task.id}`)
      .then(() => {
        setError('');
        refresh();
      })
      .catch((err: any) => {
        setError(err?.response?.data?.error || 'Nao foi possivel excluir tarefa.');
      });
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </h3>

      <p>{task.description}</p>

      <button onClick={toggleTask}>
        {task.completed ? 'Desmarcar' : 'Concluir'}
      </button>

      <button onClick={deleteTask}>Excluir</button>

      <button onClick={() => setShowComments(!showComments)}>
        Comentários
      </button>

      {showComments && <Comments taskId={task.id} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};