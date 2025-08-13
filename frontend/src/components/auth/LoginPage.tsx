import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth.types';
import { Shield, User, Lock, ChevronDown } from 'lucide-react';

interface LoginPageProps {
  onShowRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onShowRegister }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'customer' as UserRole
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(credentials.username, credentials.password, credentials.role);
      if (!success) {
        setError('Invalid credentials or role mismatch. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'admin', label: 'Administrator', description: 'System management and oversight' },
    { value: 'manager', label: 'Manager', description: 'Policy approvals and team management' },
    { value: 'employee', label: 'Employee', description: 'Customer service and policy management' },
    { value: 'customer', label: 'Customer', description: 'Policy holder access' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-blue-900 rounded-full flex items-center justify-center">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to InsuraFlow
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your insurance management portal
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username / Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username or email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-medium text-gray-900">
                        {roles.find(r => r.value === credentials.role)?.label}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {roles.find(r => r.value === credentials.role)?.description}
                      </span>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {showRoleDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => {
                          setCredentials({ ...credentials, role: role.value });
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                          credentials.role === role.value ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                        }`}
                      >
                        <div className="block font-medium">{role.label}</div>
                        <div className="block text-xs text-gray-500">{role.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Don't have an account?{' '}
              <button
                onClick={onShowRegister}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Register here
              </button>
            </p>
            <p className="text-xs text-gray-500">
              Demo Credentials:<br />
              admin/admin123, manager/manager123, employee/employee123, customer/customer123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};