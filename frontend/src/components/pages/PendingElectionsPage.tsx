import React from 'react';
import { useElection } from '../../contexts/ElectionContext';
import { Clock, Calendar, Users, AlertCircle } from 'lucide-react';

export const PendingElectionsPage: React.FC = () => {
  const { elections } = useElection();

  const pendingElections = elections.filter(e => e.status === 'pending');
  const upcomingElections = elections.filter(e => {
    const electionDate = new Date(e.date);
    const today = new Date();
    return electionDate > today;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilElection = (dateString: string) => {
    const electionDate = new Date(dateString);
    const today = new Date();
    const diffTime = electionDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Clock className="h-8 w-8 mr-3 text-blue-600" />
            Pending Elections
          </h1>
          <p className="text-gray-600 mt-2">View upcoming and pending elections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Elections */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Pending Elections</h2>
            </div>

            {pendingElections.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No pending elections at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingElections.map((election) => (
                  <div key={election.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{election.type}</h3>
                        <p className="text-sm text-gray-600">Election ID: {election.id}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(election.date)}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{election.candidates.length} candidates</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {getDaysUntilElection(election.date)} days to go
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Candidates:</p>
                      <div className="flex flex-wrap gap-2">
                        {election.candidates.map((candidate, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs bg-white border border-gray-200 rounded-full text-gray-700"
                          >
                            {candidate}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Elections */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Elections</h2>
            </div>

            {upcomingElections.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming elections scheduled.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingElections
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((election) => {
                    const daysUntil = getDaysUntilElection(election.date);
                    const isActive = election.status === 'active';
                    
                    return (
                      <div key={election.id} className={`border rounded-lg p-4 ${
                        isActive ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{election.type}</h3>
                            <p className="text-sm text-gray-600">Election ID: {election.id}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(election.date)}</span>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{election.candidates.length} candidates</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {isActive ? 'Active' : 'Scheduled'}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              {daysUntil > 0 ? `${daysUntil} days to go` : 'Today'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Candidates:</p>
                          <div className="flex flex-wrap gap-2">
                            {election.candidates.map((candidate, index) => (
                              <span
                                key={index}
                                className="inline-flex px-2 py-1 text-xs bg-white border border-gray-200 rounded-full text-gray-700"
                              >
                                {candidate}
                              </span>
                            ))}
                          </div>
                        </div>

                        {isActive && (
                          <div className="mt-4 p-3 bg-green-100 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              🗳️ Voting is now open! Cast your vote in the Cast Vote section.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* Election Timeline */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Election Timeline</h2>
          
          {elections.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No elections scheduled.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {elections
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((election, index) => {
                  const daysUntil = getDaysUntilElection(election.date);
                  const isPast = daysUntil < 0;
                  const isToday = daysUntil === 0;
                  
                  return (
                    <div key={election.id} className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full ${
                        isPast ? 'bg-gray-400' :
                        isToday ? 'bg-green-500' :
                        election.status === 'active' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}></div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{election.type}</p>
                            <p className="text-sm text-gray-500">{formatDate(election.date)}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              election.status === 'active' ? 'bg-green-100 text-green-800' :
                              election.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {election.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {isPast ? 'Completed' : 
                               isToday ? 'Today' : 
                               `${daysUntil} days`}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {index < elections.length - 1 && (
                        <div className="absolute left-6 mt-8 w-0.5 h-8 bg-gray-200"></div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};