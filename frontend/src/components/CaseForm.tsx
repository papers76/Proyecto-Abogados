import React, { useState } from 'react';
import axios from 'axios';


const CaseForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    status: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      if (!token) {
        console.error('Token no encontrado en localStorage');
        return;
      }
      
      const response = await axios.post('/api/add-cases', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los headers de la solicitud
          'Content-Type': 'application/json',
        },
      });
      console.log('Caso agregado:', response.data);
      // Lógica adicional, como redirigir o limpiar el formulario
    } catch (error) {
      console.error('Error al agregar el caso:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Fecha" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Categoría" />
      <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Estado" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" />
      <button type="submit">Agregar Caso</button>
    </form>
  );
};

export default CaseForm;

