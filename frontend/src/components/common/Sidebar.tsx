import React from 'react';
import { useElection } from '../../contexts/ElectionContext';
import { 
  UserPlus, 
  Vote, 
  BarChart3, 
  LogOut, 
  Users, 
  Calendar,
  Clock
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, currentPage, setCurrentPage, logout } = useElection();

  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { key: 'add-candidate', label: 'Add Candidate', icon: UserPlus },
        { key: 'new-election', label: 'Add New Elections', icon: Calendar },
        { key: 'results', label: 'View Election Result', icon: BarChart3 },
        { key: 'logout', label: 'Logout', icon: LogOut, action: logout }
      ];
    } else {
      return [
        { key: 'cast-vote', label: 'New Election', icon: Vote },
        { key: 'results', label: 'Results', icon: BarChart3 },
        { key: 'pending-elections', label: 'Pending Elections', icon: Clock },
        { key: 'logout', label: 'Logout', icon: LogOut, action: logout }
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Vote className="h-8 w-8 text-blue-300" />
          <div>
            <h1 className="text-xl font-bold">Election System</h1>
            <p className="text-blue-300 text-sm">{user?.name}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => item.action ? item.action() : setCurrentPage(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.key
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};