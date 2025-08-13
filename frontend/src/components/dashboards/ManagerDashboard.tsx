import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Users, FileText, TrendingUp, Eye } from 'lucide-react';

interface PolicyRequest {
  id: string;
  customerName: string;
  policyType: string;
  requestType: string;
  amount: number;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const ManagerDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'approvals' | 'employees' | 'reports'>('dashboard');

  const pendingRequests: PolicyRequest[] = [
    { id: 'PR-001', customerName: 'Alice Johnson', policyType: 'Life Insurance', requestType: 'Policy Change', amount: 75000, requestedAt: '2024-01-15', status: 'pending' },
    { id: 'PR-002', customerName: 'Mike Davis', policyType: 'Auto Insurance', requestType: 'Policy Cancellation', amount: 25000, requestedAt: '2024-01-14', status: 'pending' },
    { id: 'PR-003', customerName: 'Sarah Wilson', policyType: 'Home Insurance', requestType: 'Coverage Increase', amount: 150000, requestedAt: '2024-01-13', status: 'pending' }
  ];

  const employees = [
    { id: '1', name: 'Jane Employee', email: 'jane@insurance.com', policiesHandled: 45, customerRating: 4.8, status: 'Active' },
    { id: '2', name: 'Tom Rodriguez', email: 'tom@insurance.com', policiesHandled: 38, customerRating: 4.6, status: 'Active' },
    { id: '3', name: 'Lisa Chen', email: 'lisa@insurance.com', policiesHandled: 52, customerRating: 4.9, status: 'Active' }
  ];

  const stats = [
    { title: 'Pending Approvals', value: '12', icon: Clock, change: '+3 today', changeType: 'neutral' },
    { title: 'Active Employees', value: '8', icon: Users, change: '100% active', changeType: 'positive' },
    { title: 'Policies Approved', value: '156', icon: CheckCircle, change: '+24 this week', changeType: 'positive' },
    { title: 'Monthly Revenue', value: '$840K', icon: TrendingUp, change: '+12%', changeType: 'positive' }
  ];

  const handleApproval = (requestId: string, action: 'approve' | 'reject') => {
    console.log(`${action} request ${requestId}`);
    // Implementation would update the request status
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600">Oversee operations and approve policy changes</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'dashboard', label: 'Overview', icon: TrendingUp },
            { key: 'approvals', label: 'Policy Approvals', icon: CheckCircle },
            { key: 'employees', label: 'Team Management', icon: Users },
            { key: 'reports', label: 'Reports', icon: FileText }
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

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">Review Pending Approvals</div>
                <div className="text-xs text-gray-500">12 requests waiting</div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">Team Performance</div>
                <div className="text-xs text-gray-500">View employee metrics</div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <FileText className="h-6 w-6 text-purple-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">Generate Reports</div>
                <div className="text-xs text-gray-500">Monthly summary</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Approvals */}
      {activeSection === 'approvals' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Policy Approval Requests</h2>
            <div className="flex space-x-2">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {pendingRequests.length} Pending
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{request.customerName}</h3>
                          <p className="text-sm text-gray-500">{request.policyType} - {request.requestType}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {request.id}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Amount: ${request.amount.toLocaleString()}</span>
                        <span>Requested: {request.requestedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 p-2">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleApproval(request.id, 'approve')}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleApproval(request.id, 'reject')}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-1"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Employee Management */}
      {activeSection === 'employees' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div key={employee.id} className="bg-white rounded-lg shadow p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{employee.email}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Policies Handled:</span>
                      <span className="font-medium">{employee.policiesHandled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer Rating:</span>
                      <span className="font-medium">{employee.customerRating}/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className="font-medium text-green-600">{employee.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};