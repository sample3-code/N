import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Settings, LogOut, Shield, Users, FileText, Phone } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getNavigationItems = () => {
    switch (user.role) {
      case 'admin':
        return [
          { icon: Settings, label: 'Dashboard', href: '#dashboard' },
          { icon: Users, label: 'Manage Users', href: '#users' },
          { icon: FileText, label: 'All Policies', href: '#policies' },
          { icon: Shield, label: 'System Logs', href: '#logs' }
        ];
      case 'manager':
        return [
          { icon: Settings, label: 'Dashboard', href: '#dashboard' },
          { icon: FileText, label: 'Policy Approvals', href: '#approvals' },
          { icon: Users, label: 'Employees', href: '#employees' },
          { icon: FileText, label: 'Reports', href: '#reports' }
        ];
      case 'employee':
        return [
          { icon: Settings, label: 'Dashboard', href: '#dashboard' },
          { icon: FileText, label: 'Create Policy', href: '#create-policy' },
          { icon: Users, label: 'Customers', href: '#customers' },
          { icon: Phone, label: 'Support', href: '#support' }
        ];
      case 'customer':
        return [
          { icon: Settings, label: 'Dashboard', href: '#dashboard' },
          { icon: FileText, label: 'My Policies', href: '#my-policies' },
          { icon: Phone, label: 'Contact Support', href: '#contact' }
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-300" />
            <span className="ml-2 text-xl font-bold">InsuraFlow</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {getNavigationItems().map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:block">{user.name}</span>
              <span className="ml-2 bg-blue-800 px-2 py-1 rounded text-xs uppercase">
                {user.role}
              </span>
            </div>
            <button
              onClick={logout}
              className="hover:bg-blue-800 p-2 rounded-md transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};