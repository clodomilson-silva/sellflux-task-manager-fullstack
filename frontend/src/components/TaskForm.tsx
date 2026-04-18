import { useState } from 'react';
import { api } from '../services/api';

export const TaskForm = ({ onTaskCreated }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError('Titulo e obrigatorio.');
      return;
    }

    api.post('/tasks', { title: trimmedTitle, description: trimmedDescription })
      .then(() => {
        setTitle('');
        setDescription('');
        setError('');
        onTaskCreated();
      })
      .catch((err) => {
        setError(err?.response?.data?.error || 'Nao foi possivel criar a tarefa.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};