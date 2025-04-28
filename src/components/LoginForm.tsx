'use client';
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  errorMessage: string;
}

export default function LoginForm({ onLogin, errorMessage }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let formErrors = { username: '', password: '' };

    if (username.length < 1) {
      formErrors.username = 'El nombre de usuario es obligatorio';
      valid = false;
    }

    if (password.length < 1) {
      formErrors.password = 'La contraseña es obligatoria';
      valid = false;
    }

    setErrors(formErrors);

    if (valid) {
      onLogin(username, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '300px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Nombre de Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre de usuario"
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div style={{ marginBottom: '15px' }}>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Iniciar Sesión</button>
      <style jsx>{`
        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }
      `}</style>
    </form>
  );
}