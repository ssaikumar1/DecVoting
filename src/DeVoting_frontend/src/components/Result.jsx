import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeVoting_backend } from '../../../declarations/DeVoting_backend';

export default function Result() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [leader, setLeader] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const votingResults = await DeVoting_backend.getResults();
      console.log('Voting Results:', votingResults);
      setResults(votingResults);
  
      const currentLeader = await DeVoting_backend.getCurrentLeader();
      console.log('Current Leader:', currentLeader);
      setLeader(currentLeader[0] || null);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Voting Results</h1>
      {leader && (
        <div className="current-leader bg-blue-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Current Leader</h2>
          <p className="text-lg">
            {leader.name} ({leader.symbol}) - {leader.votes.toString()} votes
          </p>
        </div>
      )}
      <table className="results-table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Symbol</th>
            <th className="border border-gray-300 p-2">Votes</th>
          </tr>
        </thead>
        <tbody>
          {results.map((candidate) => (
            <tr key={candidate.id.toString()} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{candidate.name}</td>
              <td className="border border-gray-300 p-2">{candidate.symbol}</td>
              <td className="border border-gray-300 p-2">{candidate.votes.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={() => navigate('/')} 
        className="back-button mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}

