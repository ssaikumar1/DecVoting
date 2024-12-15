'use client'

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';
import { AuthClient } from "@dfinity/auth-client";
import { useState , useEffect } from 'react';
import './index.scss';

export default function Home() {
  const navigate = useNavigate();
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);

    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);
  };
// handle sign in
  const handleSignIn = async () => {
    const identityProvider = process.env.DFX_NETWORK === "ic" 
      ? "https://identity.ic0.app/#authorize" 
      : `https://identity.ic0.app/#authorize`;

    authClient.login({
      identityProvider: identityProvider,
      onSuccess: () => {
        setIsAuthenticated(true);
        
      },
      onError: (error) => {
        console.error("Authentication failed:", error);
      }
    });
  };
// handle logout
  const handleSignOut = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      
    }
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="app">
      <header>
        <nav className="container">
          <a href="/" className="logo">DecentralVote</a>
          <div className="nav-links">
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
            {isAuthenticated ? (
  <button onClick={handleSignOut} className="sign-in-button">Disconnect</button>
) : (
  <button onClick={handleSignIn} className="sign-in-button">Connect Internet Identity</button>
)}
            
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Secure. Transparent.<br />Decentralized.</h1>
          <p>Experience the future of voting with ICP blockchain-powered platform.</p>
          <button className="learn-more-button">Learn More</button>
        </div>
      </section>

      <main className="main-content">
        <div className="container">
          <h2>Get Started with DecentralVote</h2>
          <div className="action-buttons">
            <button className="action-button" onClick={() => handleNavigation('/voting-form')}>
              <span>Voting Form</span>
              <ArrowRightCircle className="action-icon" />
            </button>
            <button className="action-button" onClick={() => handleNavigation('/vote')}>
              <span>Vote</span>
              <ArrowRightCircle className="action-icon" />
            </button>
            <button className="action-button" onClick={() => handleNavigation('/result')}>
              <span>Results</span>
              <ArrowRightCircle className="action-icon" />
            </button>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2023 DecentralVote. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

