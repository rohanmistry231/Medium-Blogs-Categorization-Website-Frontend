// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stories');
        const allStories = response.data;

        setStories(allStories);
        setFilteredStories(allStories);

        const uniqueCategories = ['All', ...new Set(allStories.map(story => story.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const filterStoriesByCategory = (category) => {
    setActiveCategory(category);
    setFilteredStories(category === 'All' ? stories : stories.filter(story => story.category === category));
  };

  return (
    <div className="p-8 mt-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Dive into <span className="text-blue-600">Medium Blogs</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore thought-provoking blogs — categorized for seamless browsing.
        </p>
      </header>

      {/* Categories Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          value={activeCategory}
          onChange={(e) => filterStoriesByCategory(e.target.value)}
          className="w-full max-w-sm px-4 py-3 text-base rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <div
              key={story._id}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white"
            >
              {/* Thumbnail */}
              {story.thumbnail && (
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-52 object-cover"
                />
              )}

              {/* Card Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {story.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">Category: {story.category}</p>

                <div className="flex justify-between items-center">
                  <a
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Read Article →
                  </a>
                  <span className="text-xs text-gray-400">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-gray-500">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
