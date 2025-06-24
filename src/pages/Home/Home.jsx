import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "https://medium-blogs-categorization-website-backend.vercel.app/stories"
        );
        const allStories = response.data;

        setStories(allStories);
        const uniqueCategories = [
          ...new Set(allStories.map((story) => story.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFilteredStories(
      stories.filter((story) => story.category === category)
    );
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
    setFilteredStories([]);
  };

  const handleImageLoad = (storyId) => {
    setImageLoading((prev) => ({ ...prev, [storyId]: false }));
  };

  // Shimmer effect for loading state
  const shimmerEffect =
    "animate-pulse bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-700 dark:to-gray-600";

  return (
    <div
      className={`p-8 mt-12 max-w-7xl mx-auto ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <AnimatePresence>
        {!activeCategory && (
          <motion.header
            className="text-center mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className={`text-3xl sm:text-5xl font-extrabold leading-tight sm:leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Discover <span className="text-blue-500">Medium Blogs</span>
            </h1>
            <p
              className={`text-lg mt-4 max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Explore categorized blogs and stories from Medium — all in one
              place.
            </p>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className={`rounded-lg shadow-md p-6 cursor-pointer transition-all hover:-translate-y-2 ${shimmerEffect}`}
                  ></div>
                ))
              : categories.map((category) => (
                  <motion.div
                    key={category}
                    className={`rounded-lg shadow-md p-6 cursor-pointer transition-all hover:-translate-y-2 ${
                      isDarkMode
                        ? "bg-gray-800 text-white hover:bg-gray-700"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h2 className="text-2xl font-bold">{category}</h2>
                    <p
                      className={`text-sm mt-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Explore blogs in this category
                    </p>
                  </motion.div>
                ))}
          </motion.div>
        ) : (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <motion.button
              onClick={handleBackToCategories}
              className={`mb-6 px-4 py-2 rounded-md font-medium transition border ${
                isDarkMode
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-800 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.04 }}
            >
              ← Back to Categories
            </motion.button>

            <h2
              className={`text-4xl font-bold mb-8 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {activeCategory} Blogs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-lg overflow-hidden shadow-lg transition ${shimmerEffect} h-60`}
                    ></div>
                  ))
                : filteredStories.length > 0
                ? filteredStories.map((story) => (
                    <motion.div
                      key={story._id}
                      className={`rounded-lg overflow-hidden shadow-lg transition ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-black"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {story.thumbnail && (
                        <motion.div
                          className="w-full h-48"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={story.thumbnail}
                            alt={story.title}
                            className={`w-full h-full object-cover rounded-t-lg ${
                              imageLoading[story._id] ? shimmerEffect : ""
                            }`}
                            onLoad={() => handleImageLoad(story._id)}
                            loading="lazy"
                          />
                        </motion.div>
                      )}
                      <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">
                          {story.title}
                        </h2>
                        <a
                          href={story.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-medium ${
                            isDarkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-700"
                          }`}
                        >
                          Read Article →
                        </a>
                      </div>
                    </motion.div>
                  ))
                : (
                    <p
                      className={`text-center text-lg ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No blogs found in this category.
                    </p>
                  )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
