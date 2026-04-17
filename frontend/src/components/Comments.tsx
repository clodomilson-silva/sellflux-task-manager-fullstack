import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const Comments = ({ taskId }: any) => {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState('');

  const fetchComments = () => {
    api.get(`/tasks/${taskId}/comments`)
      .then(res => setComments(res.data));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = () => {
    api.post(`/tasks/${taskId}/comments`, { content })
      .then(() => {
        setContent('');
        fetchComments();
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
    </div>
  );
};