import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

const AdminPanel = () => {
  const { isDarkMode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminAuth'));

  return isAuthenticated ? (
    <AdminDashboard setIsAuthenticated={setIsAuthenticated} isDarkMode={isDarkMode} />
  ) : (
    <Login setIsAuthenticated={setIsAuthenticated} isDarkMode={isDarkMode} />
  );
};

// Login Component
const Login = ({ setIsAuthenticated, isDarkMode }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Replace with secure auth in production
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ setIsAuthenticated, isDarkMode }) => {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ title: '', link: '', category: '', thumbnail: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // Fetch all stories
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get('https://medium-blogs-categorization-website-backend.vercel.app/stories');
      setStories(response.data);
    } catch (err) {
      setError('Failed to fetch stories');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add or update story
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update story
        const response = await axios.put(`https://medium-blogs-categorization-website-backend.vercel.app/stories/${editingId}`, form);
        setStories(stories.map((story) => (story._id === editingId ? response.data : story)));
        setEditingId(null);
      } else {
        // Add new story
        const response = await axios.post('https://medium-blogs-categorization-website-backend.vercel.app/stories', form);
        setStories([...stories, ...Array.isArray(response.data) ? response.data : [response.data]]);
      }
      setForm({ title: '', link: '', category: '', thumbnail: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save story');
    }
  };

  // Edit story
  const handleEdit = (story) => {
    setForm({ title: story.title, link: story.link, category: story.category, thumbnail: story.thumbnail || '' });
    setEditingId(story._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
  };

  // Delete story
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await axios.delete(`https://medium-blogs-categorization-website-backend.vercel.app/stories/${id}`);
        setStories(stories.filter((story) => story._id !== id));
        setError('');
      } catch (err) {
        setError('Failed to delete story');
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Stories Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Add/Edit Story Form */}
        <div className={`p-6 rounded-lg shadow-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Story' : 'Add New Story'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block">Link</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block">Category</label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block">Thumbnail URL (Optional)</label>
                <input
                  type="url"
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingId ? 'Update Story' : 'Add Story'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setForm({ title: '', link: '', category: '', thumbnail: '' });
                  setEditingId(null);
                }}
                className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Stories Table */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Stories List</h2>
          {stories.length === 0 ? (
            <p>No stories found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Link</th>
                    <th className="px-4 py-2 text-left">Thumbnail</th>
                    <th className="px-4 py-2 text-left">Created At</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story) => (
                    <tr key={story._id} className={isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                      <td className="px-4 py-2">{story.title}</td>
                      <td className="px-4 py-2">{story.category}</td>
                      <td className="px-4 py-2">
                        <a href={story.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Link
                        </a>
                      </td>
                      <td className="px-4 py-2">
                        {story.thumbnail ? (
                          <img src={story.thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover" />
                        ) : (
                          'No Thumbnail'
                        )}
                      </td>
                      <td className="px-4 py-2">{new Date(story.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEdit(story)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(story._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;