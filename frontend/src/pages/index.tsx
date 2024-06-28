import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();
  const [cases, setCases] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setToken(token);
      fetchCases(token);
    }
  }, []);

  const fetchCases = async (token: string) => {
    try {
      const response = await axios.get('/api/cases', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCases(response.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/cases/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCases(cases.filter((caseItem: any) => caseItem._id !== id));
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <button onClick={() => router.push('/add-case')}>Agregar Juicio</button>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {cases.map((caseItem: any) => (
          <div key={caseItem._id}>
            <h2>{caseItem.category}</h2>
            <p>{caseItem.description}</p>
            <button onClick={() => router.push(`/edit-case/${caseItem._id}`)}>Edit</button>
            <button onClick={() => handleDelete(caseItem._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
