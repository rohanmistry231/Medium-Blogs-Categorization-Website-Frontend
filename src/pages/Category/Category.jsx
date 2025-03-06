// src/components/Categories.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const { category } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryStories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stories?category=${category}`);
        setStories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category stories:', error);
        setLoading(false);
      }
    };

    fetchCategoryStories();
  }, [category]);

  if (loading) {
    return <div className="p-5 text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Stories in "{category}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div key={story._id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p>{story.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
