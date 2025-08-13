import React, { useState } from 'react';
import { useElection } from '../../contexts/ElectionContext';
import { UserPlus, Upload, User } from 'lucide-react';

export const AddCandidatePage: React.FC = () => {
  const [candidateData, setCandidateData] = useState({
    name: '',
    address: '',
    mobile: '',
    photo: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { addCandidate, candidates } = useElection();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!candidateData.name || !candidateData.address || !candidateData.mobile) {
      setError('Please fill in all required fields.');
      return;
    }

    addCandidate(candidateData);
    setSuccess('Candidate added successfully!');
    setCandidateData({ name: '', address: '', mobile: '', photo: '' });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server. For demo, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (event) => {
        setCandidateData({ ...candidateData, photo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <UserPlus className="h-8 w-8 mr-3 text-blue-600" />
            Add Candidate
          </h1>
          <p className="text-gray-600 mt-2">Register a new candidate for elections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Candidate Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Candidate Information</h2>

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
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={candidateData.name}
                  onChange={(e) => setCandidateData({ ...candidateData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter candidate's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={candidateData.address}
                  onChange={(e) => setCandidateData({ ...candidateData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter candidate's address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile No *
                </label>
                <input
                  type="tel"
                  required
                  value={candidateData.mobile}
                  onChange={(e) => setCandidateData({ ...candidateData, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Choose File</span>
                  </label>
                  {candidateData.photo && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={candidateData.photo}
                        alt="Preview"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <span className="text-sm text-green-600">Photo uploaded</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Candidate</span>
              </button>
            </form>
          </div>

          {/* Existing Candidates */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Registered Candidates</h2>
            
            <div className="space-y-4">
              {candidates.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No candidates registered yet.</p>
              ) : (
                candidates.map((candidate) => (
                  <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {candidate.photo ? (
                          <img
                            src={candidate.photo}
                            alt={candidate.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-500">{candidate.address}</p>
                        <p className="text-sm text-gray-500">{candidate.mobile}</p>
                      </div>
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