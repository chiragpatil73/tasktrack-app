import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Account created! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="wrapper">
      
      <form
        onSubmit={handleSubmit} >
        <h2>🔐 Register</h2>
        <div className='input-box'>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required/>
        </div>

        <div className='input-box'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required/>
          </div>
          <div className='input-box'>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required/>
          </div>

        <button
          type="submit" >
          Create Account
        </button>
        <div className='login'>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
