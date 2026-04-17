import { useState } from 'react';
import { api } from '../services/api';

export const TaskForm = ({ onTaskCreated }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    api.post('/tasks', { title, description })
      .then(() => {
        setTitle('');
        setDescription('');
        onTaskCreated();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Criar</button>
    </form>
  );
};