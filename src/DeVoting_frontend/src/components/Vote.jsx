import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeVoting_backend } from '../../../declarations/DeVoting_backend';

export default function Vote() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const allCandidates = await DeVoting_backend.getAllCandidates();
      setCandidates(allCandidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const result = await DeVoting_backend.vote(candidateId);
      setMessage(result);
      // Refresh the candidate list after voting
      fetchCandidates();
    } catch (error) {
      console.error('Error voting:', error);
      setMessage('Error occurred while voting');
    }
  };

  return (
    <div className="container">
      <h1>Vote</h1>
      {message && <p className="message">{message}</p>}
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-item">
            <span className="candidate-name">{candidate.name}</span>
            <span className="candidate-symbol">{candidate.symbol}</span>
            <button onClick={() => handleVote(candidate.id)} className="vote-button">Vote</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
    </div>
  );
}

