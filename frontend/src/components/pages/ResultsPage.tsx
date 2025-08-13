import React, { useState } from 'react';
import { useElection } from '../../contexts/ElectionContext';
import { BarChart3, Trophy, Users, Calendar } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const [selectedElectionId, setSelectedElectionId] = useState('');
  const { elections } = useElection();

  const selectedElection = elections.find(e => e.id === selectedElectionId);
  const completedElections = elections.filter(e => e.votes && Object.keys(e.votes).length > 0);

  const getWinner = (votes: Record<string, number>) => {
    const entries = Object.entries(votes);
    if (entries.length === 0) return null;
    
    return entries.reduce((winner, current) => 
      current[1] > winner[1] ? current : winner
    );
  };

  const getTotalVotes = (votes: Record<string, number>) => {
    return Object.values(votes).reduce((sum, count) => sum + count, 0);
  };

  const getVotePercentage = (candidateVotes: number, totalVotes: number) => {
    return totalVotes > 0 ? ((candidateVotes / totalVotes) * 100).toFixed(1) : '0';
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-blue-600" />
            Election Results
          </h1>
          <p className="text-gray-600 mt-2">View results from completed elections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Election Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Election</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Election ID
              </label>
              <select
                value={selectedElectionId}
                onChange={(e) => setSelectedElectionId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose an election</option>
                {completedElections.map((election) => (
                  <option key={election.id} value={election.id}>
                    {election.id} - {election.type}
                  </option>
                ))}
              </select>
            </div>

            {completedElections.length === 0 && (
              <div className="mt-6 text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No completed elections with results yet.</p>
              </div>
            )}

            {/* Elections List */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Available Elections:</h3>
              {completedElections.map((election) => (
                <div
                  key={election.id}
                  onClick={() => setSelectedElectionId(election.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedElectionId === election.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{election.type}</p>
                      <p className="text-sm text-gray-500">ID: {election.id}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {getTotalVotes(election.votes || {})} votes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2">
            {selectedElection ? (
              <div className="space-y-6">
                {/* Election Header */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedElection.type}</h2>
                      <p className="text-gray-600">Election ID: {selectedElection.id}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{selectedElection.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{getTotalVotes(selectedElection.votes || {})} total votes</span>
                      </div>
                    </div>
                  </div>

                  {/* Winner Announcement */}
                  {(() => {
                    const winner = getWinner(selectedElection.votes || {});
                    return winner ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Trophy className="h-6 w-6 text-green-600 mr-3" />
                          <div>
                            <p className="font-semibold text-green-900">Winner: {winner[0]}</p>
                            <p className="text-sm text-green-700">
                              {winner[1]} votes ({getVotePercentage(winner[1], getTotalVotes(selectedElection.votes || {}))}%)
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Detailed Results */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Results</h3>
                  
                  <div className="space-y-4">
                    {Object.entries(selectedElection.votes || {})
                      .sort(([,a], [,b]) => b - a)
                      .map(([candidate, votes], index) => {
                        const totalVotes = getTotalVotes(selectedElection.votes || {});
                        const percentage = getVotePercentage(votes, totalVotes);
                        const isWinner = index === 0;
                        
                        return (
                          <div key={candidate} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                {isWinner && <Trophy className="h-5 w-5 text-yellow-500 mr-2" />}
                                <h4 className={`font-medium ${isWinner ? 'text-green-900' : 'text-gray-900'}`}>
                                  {candidate}
                                </h4>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold ${isWinner ? 'text-green-900' : 'text-gray-900'}`}>
                                  {votes} votes
                                </p>
                                <p className="text-sm text-gray-500">{percentage}%</p>
                              </div>
                            </div>
                            
                            {/* Vote Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full transition-all duration-500 ${
                                  isWinner ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {Object.keys(selectedElection.votes || {}).length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No votes cast yet for this election.</p>
                    </div>
                  )}
                </div>

                {/* Election Statistics */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Election Statistics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-900">
                        {selectedElection.candidates.length}
                      </p>
                      <p className="text-sm text-blue-700">Candidates</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-900">
                        {getTotalVotes(selectedElection.votes || {})}
                      </p>
                      <p className="text-sm text-green-700">Total Votes</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-900">
                        {(() => {
                          const winner = getWinner(selectedElection.votes || {});
                          return winner ? getVotePercentage(winner[1], getTotalVotes(selectedElection.votes || {})) : '0';
                        })()}%
                      </p>
                      <p className="text-sm text-purple-700">Winning Margin</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Select an Election</h3>
                  <p className="text-gray-500">Choose an election from the list to view its results.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};