'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useValidateUser } from '../hooks/validateUser';
import LoginForm from '../components/LoginForm';

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');
  const { validateUser } = useValidateUser();
  const router = useRouter();

  const handleLogin = (username: string, password: string) => {
    const user = validateUser(username, password);
    if (!user) {
      setErrorMessage('Acceso denegado. Usuario o contraseña incorrectos');
    } else {
      router.push(
        `/welcome?fullName=${encodeURIComponent(user.fullName)}&membershipNumber=${encodeURIComponent(user.membershipNumber)}`
      );
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white', color: 'black' }}>
      <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
    </div>
  );
}