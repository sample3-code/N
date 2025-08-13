import React, { useState } from 'react';
import { FileText, Phone, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';

interface Policy {
  id: string;
  type: string;
  premium: number;
  status: 'active' | 'pending' | 'expired';
  startDate: string;
  endDate: string;
  coverage: number;
}

export const CustomerDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'policies' | 'requests' | 'contact'>('dashboard');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState<'change' | 'cancel'>('change');

  const userPolicies: Policy[] = [
    { id: 'P-001', type: 'Life Insurance', premium: 2500, status: 'active', startDate: '2024-01-01', endDate: '2029-01-01', coverage: 500000 },
    { id: 'P-002', type: 'Auto Insurance', premium: 1200, status: 'active', startDate: '2024-01-15', endDate: '2025-01-15', coverage: 50000 },
    { id: 'P-003', type: 'Health Insurance', premium: 3600, status: 'pending', startDate: '2024-02-01', endDate: '2025-02-01', coverage: 100000 }
  ];

  const pendingRequests = [
    { id: 'R-001', type: 'Policy Change', policyId: 'P-001', status: 'pending', requestedAt: '2024-01-10' },
    { id: 'R-002', type: 'Coverage Increase', policyId: 'P-002', status: 'approved', requestedAt: '2024-01-05' }
  ];

  const stats = [
    { title: 'Active Policies', value: '2', icon: FileText, change: '1 pending', changeType: 'neutral' },
    { title: 'Total Coverage', value: '$650K', icon: CheckCircle, change: 'Full protection', changeType: 'positive' },
    { title: 'Monthly Premium', value: '$625', icon: DollarSign, change: 'Auto-pay enabled', changeType: 'positive' },
    { title: 'Pending Requests', value: '1', icon: Clock, change: 'Under review', changeType: 'neutral' }
  ];

  const PolicyRequestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Policy Request</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value as 'change' | 'cancel')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="change">Policy Change</option>
              <option value="cancel">Policy Cancellation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Policy</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {userPolicies.filter(p => p.status === 'active').map(policy => (
                <option key={policy.id} value={policy.id}>
                  {policy.type} - {policy.id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Details</label>
            <textarea
              rows={4}
              placeholder="Please describe your request in detail..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setShowRequestModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Submit Request
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
        <h1 className="text-3xl font-bold text-gray-900">My Insurance Portal</h1>
        <p className="text-gray-600">Manage your policies and requests</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'dashboard', label: 'Overview', icon: CheckCircle },
            { key: 'policies', label: 'My Policies', icon: FileText },
            { key: 'requests', label: 'Requests', icon: Clock },
            { key: 'contact', label: 'Contact Support', icon: Phone }
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
              <button
                onClick={() => setShowRequestModal(true)}
                className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 text-left transition-colors"
              >
                <AlertCircle className="h-6 w-6 text-blue-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">Request Policy Change</div>
                <div className="text-xs text-gray-500">Modify coverage or terms</div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 text-left transition-colors">
                <DollarSign className="h-6 w-6 text-green-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">Make Payment</div>
                <div className="text-xs text-gray-500">Pay premium online</div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 text-left transition-colors">
                <Phone className="h-6 w-6 text-purple-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">Contact Support</div>
                <div className="text-xs text-gray-500">Get help from our team</div>
              </button>
            </div>
          </div>

          {/* Policy Overview */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Policy Overview</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {userPolicies.slice(0, 2).map((policy) => (
                <div key={policy.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{policy.type}</h4>
                      <p className="text-sm text-gray-500">Policy #{policy.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${policy.premium.toLocaleString()}/year</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        policy.status === 'active' ? 'bg-green-100 text-green-800' :
                        policy.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {policy.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* My Policies */}
      {activeSection === 'policies' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">My Policies</h2>
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center space-x-2"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Request Change</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userPolicies.map((policy) => (
              <div key={policy.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{policy.type}</h3>
                    <p className="text-sm text-gray-500">Policy #{policy.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    policy.status === 'active' ? 'bg-green-100 text-green-800' :
                    policy.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Coverage Amount:</span>
                    <span className="text-sm font-medium">${policy.coverage.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Annual Premium:</span>
                    <span className="text-sm font-medium">${policy.premium.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Start Date:</span>
                    <span className="text-sm font-medium">{policy.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">End Date:</span>
                    <span className="text-sm font-medium">{policy.endDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 text-sm">
                      View Details
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 text-sm">
                      Download Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requests */}
      {activeSection === 'requests' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">My Requests</h2>
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center space-x-2"
            >
              <AlertCircle className="h-4 w-4" />
              <span>New Request</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{request.type}</h3>
                      <p className="text-sm text-gray-500">Policy #{request.policyId}</p>
                      <p className="text-sm text-gray-500">Requested on {request.requestedAt}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Support */}
      {activeSection === 'contact' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Contact Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-500">1-800-INSURE-1</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-500">support@insuraflow.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showRequestModal && <PolicyRequestModal />}
    </div>
  );
};