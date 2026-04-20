import React, { useState } from 'react';
import './loginSignUp.css';
import userIcon from '../assets/person.png';
import emailIcon from '../assets/email.png';
import passIcon from '../assets/password.png';
import ChatApp from '../chat/chat.jsx';

const LoginSignUp = () => {
  const [action, setAction] = useState('Sign Up');
  // 1. Nayi state add ki hai track karne ke liye ki login/signup successful hua ya nahi
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = action === 'Sign Up' 
      ? 'http://localhost:8000/api/user/create' 
      : 'http://localhost:8000/api/user/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        alert(data.message);
        setIsLoggedIn(true); 
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error, please try again.');
    }
  };

  const setMode = (mode) => {
    setAction(mode);
  };

  // 3. Agar isLoggedIn true hai, toh hum baaki ka form na dikhakar seedha ChatApp render karenge
  if (isLoggedIn) {
    return (
      <div className="app-wrapper">
     <ChatApp />;
    </div>
    )
  }

  // Agar login nahi hua hai, toh normal form dikhega
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === 'Sign Up' && (
            <div className="input">
              <img src={userIcon} alt="user icon" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="input">
            <img src={emailIcon} alt="email icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input">
            <img src={passIcon} alt="password icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {action === 'Login' && (
          <div className="forgetPassword">
            <span role="button" tabIndex={0}>Forget Password?</span>
          </div>
        )}

        <div className="submitContainer">
          <button
            type="button"
            className={`submit ${action === 'Sign Up' ? 'primary' : ''}`}
            onClick={() => setMode('Sign Up')}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={`submit ${action === 'Login' ? 'primary' : ''}`}
            onClick={() => setMode('Login')}
          >
            Login
          </button>
          <button type="submit" className="submit primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignUp;