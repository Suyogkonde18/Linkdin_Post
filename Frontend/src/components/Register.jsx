import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/user/register', form);
      const userData = res.data;
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Register</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500"
        />

        <input
          type="text"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Enter your bio"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Register
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-2 text-blue-600 hover:underline font-medium"
          >
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
