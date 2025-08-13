import React, { useState } from 'react';
import { useElection } from '../../contexts/ElectionContext';
import { Calendar, Users, Plus, Trash2 } from 'lucide-react';

export const NewElectionPage: React.FC = () => {
  const [electionData, setElectionData] = useState({
    id: '',
    type: '',
    numberOfCandidates: 2,
    candidates: ['', ''],
    date: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { addElection, elections } = useElection();

  const handleNumberOfCandidatesChange = (num: number) => {
    const newCandidates = Array(num).fill('').map((_, index) => 
      electionData.candidates[index] || ''
    );
    setElectionData({
      ...electionData,
      numberOfCandidates: num,
      candidates: newCandidates
    });
  };

  const handleCandidateNameChange = (index: number, name: string) => {
    const newCandidates = [...electionData.candidates];
    newCandidates[index] = name;
    setElectionData({ ...electionData, candidates: newCandidates });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!electionData.id || !electionData.type || !electionData.date) {
      setError('Please fill in all required fields.');
      return;
    }

    const emptyCandidates = electionData.candidates.filter(name => !name.trim());
    if (emptyCandidates.length > 0) {
      setError('Please provide names for all candidates.');
      return;
    }

    addElection({
      id: electionData.id,
      type: electionData.type,
      candidates: electionData.candidates.filter(name => name.trim()),
      date: electionData.date
    });

    setSuccess('Election created successfully!');
    setElectionData({
      id: '',
      type: '',
      numberOfCandidates: 2,
      candidates: ['', ''],
      date: ''
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-blue-600" />
            Add New Election
          </h1>
          <p className="text-gray-600 mt-2">Create a new election with candidates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* New Election Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Election Details</h2>

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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election ID *
                </label>
                <input
                  type="text"
                  required
                  value={electionData.id}
                  onChange={(e) => setElectionData({ ...electionData, id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter unique election ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election Type *
                </label>
                <input
                  type="text"
                  required
                  value={electionData.type}
                  onChange={(e) => setElectionData({ ...electionData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Presidential Election, Local Election"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Candidates *
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  required
                  value={electionData.numberOfCandidates}
                  onChange={(e) => handleNumberOfCandidatesChange(parseInt(e.target.value) || 2)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Candidates *
                </label>
                <div className="space-y-3">
                  {electionData.candidates.map((candidate, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 w-20">
                        Candidate {index + 1}:
                      </span>
                      <input
                        type="text"
                        required
                        value={candidate}
                        onChange={(e) => handleCandidateNameChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter candidate ${index + 1} name`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election Date *
                </label>
                <input
                  type="date"
                  required
                  value={electionData.date}
                  onChange={(e) => setElectionData({ ...electionData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Election</span>
              </button>
            </form>
          </div>

          {/* Existing Elections */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Created Elections</h2>
            
            <div className="space-y-4">
              {elections.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No elections created yet.</p>
              ) : (
                elections.map((election) => (
                  <div key={election.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{election.type}</h3>
                        <p className="text-sm text-gray-500">ID: {election.id}</p>
                        <p className="text-sm text-gray-500">Date: {election.date}</p>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Candidates:</p>
                          <ul className="text-sm text-gray-500 ml-4">
                            {election.candidates.map((candidate, index) => (
                              <li key={index}>• {candidate}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        election.status === 'active' ? 'bg-green-100 text-green-800' :
                        election.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {election.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};