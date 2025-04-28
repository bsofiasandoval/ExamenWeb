'use client';
import React, { use } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Welcome() {
  const searchParams = useSearchParams();
  const fullName = searchParams.get('fullName') || 'nombre del socio'

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5', color: '#333' }}>
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1>¡Hola, {fullName}!</h1>
        <p>Gracias por ser parte de Café Aurora.</p>
      </div>
    </div>
  );
}