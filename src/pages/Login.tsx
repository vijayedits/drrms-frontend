import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [role, setRole] = useState('Admin');
  const Navigate=useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const email = (document.querySelector('input[type="email"]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
  
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(`Welcome, ${data.user.role}!`);
        if(data.user.role=='volunteer'){Navigate('/volunteers')}
        // Redirect or save session info here
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Try again.');
    }
  };
  
  return (
    <div className="page">
      <div className="login-container">

        <div className="header">
          <div className="title-banner">
            <h1>Disaster Relief Resource Management System</h1>
            <p className="subtitle">Coordinated Help. Swift Response. Better Recovery.</p>
          </div>

          <div className="role-select">
            <label htmlFor="role">Select Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>
        </div>

        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required />
            </div>
            <button type="submit">Login as {role}</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
