import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setMessage('Text is required');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/post/create',
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Post created successfully!');
      setText('');

      setTimeout(() => {
        navigate('/home');
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || '❌ Failed to create post');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Create a Post</h2>

        {message && (
          <p className="text-center text-blue-600 font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
            className="w-full p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md text-gray-800"
            rows={5}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
