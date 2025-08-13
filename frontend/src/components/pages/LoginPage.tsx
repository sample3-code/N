import React, { useState } from 'react';
import { useElection } from '../../contexts/ElectionContext';
import { Vote, User, Lock, UserPlus, LogOut } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, registerUser } = useElection();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(credentials.identifier, credentials.password)) {
      setSuccess('Login successful!');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!registerData.email || !registerData.password || !registerData.name) {
      setError('All fields are required.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (registerUser(registerData.email, registerData.password, registerData.name)) {
      setSuccess('Registration successful! You can now login.');
      setShowRegister(false);
      setRegisterData({ email: '', password: '', name: '' });
    } else {
      setError('Email already exists. Please use a different email.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Vote className="h-8 w-8 text-blue-300" />
            <h1 className="text-xl font-bold">Election System</h1>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setShowRegister(true)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-colors"
            >
              <UserPlus className="h-5 w-5" />
              <span>New Registration</span>
            </button>
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-300">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {!showRegister ? (
            // Login Form
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="mx-auto h-16 w-16 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <Vote className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Login to Vote</h2>
                <p className="text-gray-600">Enter your credentials to access the system</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username / Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={credentials.identifier}
                      onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter username (admin1) or email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setCredentials({ identifier: '', password: '' })}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Demo credentials: admin1/admin123, john@example.com/voter123
                </p>
              </div>
            </div>
          ) : (
            // Registration Form
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">New Registration</h2>
                <p className="text-gray-600">Create your voter account</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a password"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegister(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Note: Only voters can register. Admin accounts are managed separately.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};