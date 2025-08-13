import React from 'react';
import { useElection } from '../contexts/ElectionContext';
import { Sidebar } from './common/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { AddCandidatePage } from './pages/AddCandidatePage';
import { NewElectionPage } from './pages/NewElectionPage';
import { CastVotePage } from './pages/CastVotePage';
import { ResultsPage } from './pages/ResultsPage';
import { PendingElectionsPage } from './pages/PendingElectionsPage';

export const MainApp: React.FC = () => {
  const { user, currentPage } = useElection();

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'add-candidate':
        return <AddCandidatePage />;
      case 'new-election':
        return <NewElectionPage />;
      case 'cast-vote':
        return <CastVotePage />;
      case 'results':
        return <ResultsPage />;
      case 'pending-elections':
        return <PendingElectionsPage />;
      default:
        return user.role === 'admin' ? <AddCandidatePage /> : <CastVotePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        {renderPage()}
      </div>
    </div>
  );
};