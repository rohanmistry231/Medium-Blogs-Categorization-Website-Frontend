import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import axios from "axios";

const Profile = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [profile, setProfile] = useState({
    name: "Rohan Mistry",
    email: "rohanmistry231@gmail.com",
    bio: "Curating and categorizing insightful Medium blogs for easy discovery.",
    avatarUrl: "profile.jpg",
    socialLinks: {
      portfolio: "https://irohanportfolio.netlify.app",
      linkedin: "https://linkedin.com/in/rohan-mistry-493987202",
      github: "https://github.com/rohanmistry231",
      medium: "https://medium.com/@rohanmistry231",
    },
    wallsaifrontend:
      "https://github.com/rohanmistry231/Medium-Blogs-Categorization-Website-Frontend.git",
    wallsaibackend:
      "https://github.com/rohanmistry231/Medium-Blogs-Categorization-Website-Backend.git",
  });

  const [storyCount, setStoryCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://medium-blogs-categorization-website-backend.vercel.app/stories"
        );

        const stories = response.data;

        setStoryCount(stories.length);

        const uniqueCategories = [
          ...new Set(stories.map((story) => story.category)),
        ];
        setCategoryCount(uniqueCategories.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`max-h-screen p-6 sm:p-8 mt-14 transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <motion.div
        className={`max-w-4xl mx-auto rounded-lg ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500"></div>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <motion.div
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img
                src={profile.avatarUrl}
                alt="Profile Avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-500"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {profile.name}
                </h1>
                <a
                  href={`mailto:${profile.email}`}
                  className={`text-sm ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {profile.email}
                </a>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div
              className="mt-6 text-center sm:text-left"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p
                className={`text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {profile.bio}
              </p>
            </motion.div>

            {/* Blog Stats */}
            <motion.div
              className="mt-5 grid grid-cols-2 gap-4 text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div
                className={`p-4 rounded-lg shadow ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <h2 className="text-3xl font-bold">{storyCount}</h2>
                <p className="text-lg">Medium Stories</p>
              </div>

              <div
                className={`p-4 rounded-lg shadow ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <h2 className="text-3xl font-bold">{categoryCount}</h2>
                <p className="text-lg">Categories</p>
              </div>
            </motion.div>

            {/* GitHub Repository Section */}
            <motion.div
              className={`mt-5 p-6 rounded-lg shadow mb-2 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              }`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <h2 className="text-2xl font-semibold text-center">
                MediHub Codebase
              </h2>
              <p className="mt-4 text-center text-lg">
                Explore the complete source code for this project on GitHub.
                Learn how it’s built and feel free to contribute or star the
                repository.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <a
                  href={profile.wallsaifrontend || "#"}
                  className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MediHub Frontend
                </a>
                <a
                  href={profile.wallsaibackend || "#"}
                  className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Medihub Backend
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="mt-5"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <h3 className="text-2xl font-semibold text-center sm:text-left">
                Connect with Me
              </h3>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-4">
                {Object.entries(profile.socialLinks).map(([key, link]) => (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-2 rounded-lg font-medium text-sm transition border ${
                      isDarkMode
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-300 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
