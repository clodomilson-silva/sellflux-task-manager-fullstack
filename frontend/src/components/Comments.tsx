import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export const Comments = ({ taskId }: any) => {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const fetchComments = useCallback(() => {
    api.get(`/tasks/${taskId}/comments`)
      .then(res => setComments(res.data))
      .catch(() => {
        setError('Nao foi possivel carregar comentarios.');
      });
  }, [taskId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError('Content e obrigatorio.');
      return;
    }

    api.post(`/tasks/${taskId}/comments`, { content: trimmedContent })
      .then(() => {
        setContent('');
        setError('');
        fetchComments();
      })
      .catch((err) => {
        setError(err?.response?.data?.error || 'Nao foi possivel adicionar comentario.');
      });
  };

  return (
    <div>
      <h4>Comentários</h4>

      {comments.map(c => (
        <p key={c.id}>- {c.content}</p>
      ))}

      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Novo comentário"
      />

      <button onClick={addComment}>Adicionar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};