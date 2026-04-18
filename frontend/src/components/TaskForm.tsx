import { FormEvent, useState } from 'react';
import { api } from '../services/api';

type TaskFormProps = {
  onTaskCreated: () => void;
};

export const TaskForm = ({ onTaskCreated }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      .catch((err: any) => {
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