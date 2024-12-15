import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.scss';
import VoteForm from './components/VoteForm';
import Result from './components/Result';
import Vote from './components/Vote';
import Home from './Page';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voting-form" element={<VoteForm />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/result" element={<Result />} />
      
      </Routes>
    </Router>
  );
}


export default App;
