import React, { useState } from 'react';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

export const AuthContainer: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {showRegister ? (
        <RegisterPage onBackToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginPage onShowRegister={() => setShowRegister(true)} />
      )}
    </>
  );
};