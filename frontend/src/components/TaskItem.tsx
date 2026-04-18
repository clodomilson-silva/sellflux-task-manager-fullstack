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
    <div className="task-card">
      <div className="task-status-row">
        <span className={`task-status-badge ${task.completed ? 'status-done' : 'status-pending'}`}>
          {task.completed ? 'Concluída' : 'Pendente'}
        </span>
      </div>

      <h3 className={`task-title ${task.completed ? 'task-completed' : ''}`}>
        {task.title}
      </h3>

      <p>{task.description}</p>

      <div className="task-actions">
        <button className="btn-complete" onClick={toggleTask}>
          {task.completed ? 'Desmarcar' : 'Concluir'}
        </button>

        <button className="btn-delete" onClick={deleteTask}>Excluir</button>

        <button className="btn-comments" onClick={() => setShowComments(!showComments)}>
          Comentários
        </button>
      </div>

      {showComments && <Comments taskId={task.id} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};