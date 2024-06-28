import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true); // Setear estado de sesión iniciada
    } catch (error) {
      setMessage('Error al iniciar sesión');
    }
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <h2>Bienvenido, {username}!</h2>
          <button onClick={() => router.push('/add-case')}>Agregar Juicio</button>
        </>
      ) : (
        <>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;

