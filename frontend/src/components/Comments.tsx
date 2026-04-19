import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Comment } from '../types';

type CommentsProps = {
  taskId: string;
};

export const Comments = ({ taskId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const formatCommentDate = (createdAt: string) => {
    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return 'Data indisponivel';
    }

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchComments = useCallback(() => {
    api.get(`/tasks/${taskId}/comments`)
      .then((res) => {
        setComments(res.data);
        setError('');
      })
      .catch((err: any) => {
        setError(err?.response?.data?.error || 'Nao foi possivel carregar comentarios.');
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
      .catch((err: any) => {
        setError(err?.response?.data?.error || 'Nao foi possivel adicionar comentario.');
      });
  };

  return (
    <div className="comments">
      <h4>Comentários</h4>

      {comments.map(c => (
        <div key={c.id} className="comment-item">
          <p className="comment-content">- {c.content}</p>
          <span className="comment-date">{formatCommentDate(c.created_at)}</span>
        </div>
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