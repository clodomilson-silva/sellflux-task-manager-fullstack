import { useState } from 'react';
import { api } from '../services/api';
import { Comments } from './Comments';

export const TaskItem = ({ task, refresh }: any) => {
  const [showComments, setShowComments] = useState(false);

  const toggleTask = () => {
    api.patch(`/tasks/${task.id}`)
      .then(refresh);
  };

  const deleteTask = () => {
    api.delete(`/tasks/${task.id}`)
      .then(refresh);
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
    </div>
  );
};