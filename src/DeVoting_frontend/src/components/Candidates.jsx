import React from 'react';



// Define candidates prop as a plain array
export function CandidateList({ candidates }) {
    const handleVote = (candidateId) => {
      // Implement voting logic here
      console.log(`Voted for candidate with ID: ${candidateId}`);
    };
  
  return (
    <div className="candidate-list">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="candidate-item">
          <span className="candidate-name">{candidate.name}</span>
          <span className="candidate-symbol">{candidate.symbol}</span>
          <button onClick={() => handleVote(candidate.id)} className="vote-button">Vote</button>
        </div>
      ))}
    </div>
  );
}

