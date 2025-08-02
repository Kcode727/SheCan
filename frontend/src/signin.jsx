import { useState } from 'react';
import './signin.css';
import logo from './assets/logo.svg';

export default function SignIn({ onSignIn }) {
  const [overlayHidden, setOverlayHidden] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        onSignIn(); 
      }, 1000);
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="container">
      {!overlayHidden && (
        <div className="overlay">
          <img src={logo} alt="Logo" className="side-image" />
          <h2 className="heading">
            Together We Can Change <span className="highlight">THE WORLD</span>
          </h2>
          <h2
            className="subheading"
            onMouseEnter={() => setOverlayHidden(true)}
          >
            Be a part!
          </h2>
        </div>
      )}

      <form
        className={`form ${overlayHidden ? 'visible' : ''}`}
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
