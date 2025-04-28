'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useValidateUser } from '../hooks/validateUser';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' , login: ''});
  const { error, validateUser } = useValidateUser();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let errors = { username: '', password: '' , login: ''};

    if (username.length < 1) {
      errors.username = 'El nombre de usuario es obligatorio';
      valid = false;
    }

    if (password.length < 1) {
      errors.password = 'La contraseña es obligatoria';
      valid = false;
    }

    if (valid) {
      const user = validateUser(username, password);
      if (!user) {
        errors.login = error || 'Acceso denegado. Usuario o contraseña incorrectos';
        valid = false;
      }
      else {
        router.push(
          `/welcome?fullName=${encodeURIComponent(user.fullName)}&membershipNumber=${encodeURIComponent(user.membershipNumber)}`
        );
      }
    }

    setErrors(errors);
    
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white', color: 'black' }}>
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
          {errors.login && <p className="error">{errors.login}</p>}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Iniciar Sesión</button>
      </form>
      <style jsx>{`
        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}
