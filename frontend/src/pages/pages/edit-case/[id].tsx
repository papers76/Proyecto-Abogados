import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditCasePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      fetchCase(id as string);
    }
  }, [id]);

  const fetchCase = async (caseId: string) => {
    try {
      const response = await axios.get(`/api/cases/${caseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const { date, category, status, description } = response.data;
      setDate(new Date(date).toISOString().substring(0, 10));
      setCategory(category);
      setStatus(status);
      setDescription(description);
    } catch (error) {
      console.error('Error fetching case:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/cases/${id}`,
        { date, category, status, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      router.push('/');
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  return (
    <div className="container">
      <h1>Editar Juicio</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Estado"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditCasePage;
