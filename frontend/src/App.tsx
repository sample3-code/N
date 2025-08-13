import React from 'react';
import { ElectionProvider } from './contexts/ElectionContext';
import { MainApp } from './components/MainApp';

function App() {
  return (
    <ElectionProvider>
      <MainApp />
    </ElectionProvider>
  );
}

export default App;