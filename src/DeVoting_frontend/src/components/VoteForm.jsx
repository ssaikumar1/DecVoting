import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeVoting_backend } from '../../../declarations/DeVoting_backend';

export default function VoteForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await DeVoting_backend.addCandidate(name, symbol);
      console.log('Candidate added successfully');
      setName('');
      setSymbol('');
      // Optionally, navigate to the vote page after adding a candidate
      navigate('/vote');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };
  
  return (
    <div className="container">
      <h1>Add Candidate</h1>
      <form onSubmit={handleSubmit} className="candidate-form">
        <div className="form-group">
          <label htmlFor="name">Candidate Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="symbol">Symbol Name</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Candidate</button>
      </form>
      <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
    </div>
  );
}

