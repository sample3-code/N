import React, { useState } from 'react';
import { Plus, Users, FileText, Phone, CheckCircle, Clock, User } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  policies: number;
  status: 'active' | 'inactive';
}

export const EmployeeDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'create-policy' | 'customers' | 'support'>('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const todaysTasks = [
    { id: '1', task: 'Follow up with John Smith about policy renewal', priority: 'high', deadline: '2:00 PM' },
    { id: '2', task: 'Process policy change for Sarah Johnson', priority: 'medium', deadline: '4:00 PM' },
    { id: '3', task: 'Schedule call with Mike Davis for consultation', priority: 'low', deadline: 'Tomorrow' }
  ];

  const customers: Customer[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1-555-1001', policies: 2, status: 'active' },
    { id: '2', name: 'Bob Wilson', email: 'bob@example.com', phone: '+1-555-1002', policies: 1, status: 'active' },
    { id: '3', name: 'Carol Brown', email: 'carol@example.com', phone: '+1-555-1003', policies: 3, status: 'inactive' }
  ];

  const stats = [
    { title: 'Tasks Today', value: '8', icon: CheckCircle, change: '3 completed', changeType: 'positive' },
    { title: 'Active Customers', value: '45', icon: Users, change: '+2 this week', changeType: 'positive' },
    { title: 'Policies Created', value: '12', icon: FileText, change: 'This month', changeType: 'neutral' },
    { title: 'Support Tickets', value: '5', icon: Phone, change: '2 pending', changeType: 'neutral' }
  ];

  const CreatePolicyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Create New Policy</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Policy Type</option>
            <option value="life">Life Insurance</option>
            <option value="health">Health Insurance</option>
            <option value="auto">Auto Insurance</option>
            <option value="home">Home Insurance</option>
            <option value="business">Business Insurance</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Premium Amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Duration (years)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="date"
            placeholder="Start Date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Create Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="text-gray-600">Assist customers and manage policies</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'dashboard', label: 'Overview', icon: CheckCircle },
            { key: 'create-policy', label: 'Create Policy', icon: Plus },
            { key: 'customers', label: 'Customers', icon: Users },
            { key: 'support', label: 'Support', icon: Phone }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeSection === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard Overview */}
      {activeSection === 'dashboard' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Today's Tasks */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {todaysTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                        <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Policy */}
      {activeSection === 'create-policy' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Create New Policy</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Policy</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create a New Policy</h3>
              <p className="text-gray-500 mb-6">Click the button above to start creating a new insurance policy for a customer.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">Life Insurance</h4>
                  <p className="text-sm text-gray-500">Protect your family's future</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">Auto Insurance</h4>
                  <p className="text-sm text-gray-500">Comprehensive vehicle protection</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">Home Insurance</h4>
                  <p className="text-sm text-gray-500">Safeguard your property</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Management */}
      {activeSection === 'customers' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Customer Management</h2>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policies</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.policies}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">View Details</button>
                      <button className="text-green-600 hover:text-green-900">Contact</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateModal && <CreatePolicyModal />}
    </div>
  );
};