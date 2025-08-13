import React, { useState } from 'react';
import { useElection } from '../../contexts/ElectionContext';
import { Vote, User, Eye, CheckCircle, Phone, Shield } from 'lucide-react';

export const CastVotePage: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedElection, setSelectedElection] = useState('');
  const [showProfile, setShowProfile] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');

  const { elections, candidates, castVote } = useElection();

  const activeElections = elections.filter(e => e.status === 'active');
  const currentElection = activeElections.find(e => e.id === selectedElection);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleVoteClick = () => {
    if (!selectedElection || !selectedCandidate) {
      setError('Please select an election and candidate first.');
      return;
    }
    setError('');
    setShowOtpModal(true);
  };

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }
    
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setError('');
    
    // Simulate OTP sending
    alert(`OTP sent to ${phoneNumber}: ${newOtp}`);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      setError('');
      
      // Cast the vote after OTP verification
      castVote(selectedElection, selectedCandidate);
      setSuccess('Your vote has been cast successfully!');
      
      // Reset form
      setSelectedCandidate('');
      setSelectedElection('');
      setShowOtpModal(false);
      setPhoneNumber('');
      setOtp('');
      setOtpSent(false);
      setOtpVerified(false);
      setGeneratedOtp('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowOtpModal(false);
    setPhoneNumber('');
    setOtp('');
    setOtpSent(false);
    setOtpVerified(false);
    setGeneratedOtp('');
    setError('');
  };

  const getCandidateProfile = (candidateName: string) => {
    return candidates.find(c => c.name === candidateName);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Vote className="h-8 w-8 mr-3 text-blue-600" />
            Cast Your Vote
          </h1>
          <p className="text-gray-600 mt-2">Participate in active elections</p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voting Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Elections</h2>

            {activeElections.length === 0 ? (
              <div className="text-center py-12">
                <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No active elections available at the moment.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Election Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Election
                  </label>
                  <select
                    value={selectedElection}
                    onChange={(e) => {
                      setSelectedElection(e.target.value);
                      setSelectedCandidate('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose an election</option>
                    {activeElections.map((election) => (
                      <option key={election.id} value={election.id}>
                        {election.type} - {election.date}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Candidate Selection */}
                {currentElection && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Who should be leader?
                    </h3>
                    <div className="space-y-3">
                      {currentElection.candidates.map((candidateName, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id={`candidate-${index}`}
                                name="candidate"
                                value={candidateName}
                                checked={selectedCandidate === candidateName}
                                onChange={(e) => setSelectedCandidate(e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <label htmlFor={`candidate-${index}`} className="flex-1 cursor-pointer">
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    {getCandidateProfile(candidateName)?.photo ? (
                                      <img
                                        src={getCandidateProfile(candidateName)?.photo}
                                        alt={candidateName}
                                        className="h-full w-full rounded-full object-cover"
                                      />
                                    ) : (
                                      <User className="h-5 w-5 text-gray-500" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      Candidate {index + 1}: {candidateName}
                                    </p>
                                  </div>
                                </div>
                              </label>
                            </div>
                            <button
                              onClick={() => setShowProfile(candidateName)}
                              className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 text-sm"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View Profile</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleVoteClick}
                      disabled={!selectedCandidate}
                      className="w-full mt-6 bg-blue-900 text-white py-3 px-4 rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      <Vote className="h-4 w-4" />
                      <span>Cast Vote</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Election Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Election Information</h2>
            
            {currentElection ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">{currentElection.type}</h3>
                  <p className="text-sm text-gray-500">Election ID: {currentElection.id}</p>
                  <p className="text-sm text-gray-500">Date: {currentElection.date}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Participating Candidates:</h4>
                  <ul className="space-y-1">
                    {currentElection.candidates.map((candidate, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {candidate}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Voting Guidelines:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Select one candidate from the list</li>
                    <li>• Review candidate profiles before voting</li>
                    <li>• Phone verification required for security</li>
                    <li>• Your vote is anonymous and secure</li>
                    <li>• You can only vote once per election</li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select an election to view details.</p>
            )}
          </div>
        </div>

        {/* OTP Verification Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Verify Your Identity</h3>
                <p className="text-sm text-gray-600 mt-2">
                  For security purposes, please verify your phone number to cast your vote
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {!otpSent ? (
                  // Phone Number Input
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        maxLength={10}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send you a 6-digit verification code
                    </p>
                  </div>
                ) : (
                  // OTP Input
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      OTP sent to {phoneNumber}
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Selected:</strong> {selectedCandidate}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Election:</strong> {currentElection?.type}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {!otpSent ? (
                  <button
                    onClick={handleSendOtp}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Send OTP</span>
                  </button>
                ) : (
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Verify & Vote</span>
                  </button>
                )}
              </div>

              {otpSent && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                      setError('');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Change phone number
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Candidate Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Candidate Profile</h3>
              {(() => {
                const profile = getCandidateProfile(showProfile);
                return profile ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                        {profile.photo ? (
                          <img
                            src={profile.photo}
                            alt={profile.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-10 w-10 text-gray-500" />
                        )}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">{profile.name}</h4>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Address:</span>
                        <p className="text-sm text-gray-600">{profile.address}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Mobile:</span>
                        <p className="text-sm text-gray-600">{profile.mobile}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Profile not found for this candidate.</p>
                );
              })()}
              <button
                onClick={() => setShowProfile(null)}
                className="w-full mt-6 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};