import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/user/login', form);

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login successful');
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Login</h2>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Login
        </button>

        <div className="text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline font-medium mt-1"
          >
            Go to Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
