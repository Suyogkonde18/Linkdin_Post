import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.msg || 'Failed to load posts');
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700">My Feed</h2>
          <button
            onClick={() => navigate('/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            + Create Post
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="border border-gray-300 rounded-md p-4 mb-4 shadow-sm"
            >
              <p className="text-lg text-gray-800">{post.text}</p>
              <p className="text-sm text-gray-500 mt-1">
                By <span className="font-semibold">{post.author?.name || 'Unknown'}</span> on{' '}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
