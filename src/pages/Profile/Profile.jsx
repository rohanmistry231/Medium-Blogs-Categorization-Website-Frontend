import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "",
    socialLinks: {
      portfolio: "",
      linkedin: "",
      github: "",
      medium: "",
    },
    wallpaperCount: 0,
    topWallpaper: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Simulated API response
        const userData = {
          name: "Rohan Mistry",
          email: "rohanmistry231@gmail.com",
          bio: "A passionate wallpaper designer and developer, sharing beautiful and high-quality images with the world.",
          avatarUrl: "profile.jpg",
          socialLinks: {
            portfolio: "https://irohanportfolio.netlify.app",
            linkedin: "https://linkedin.com/in/rohan-mistry-493987202",
            github: "https://github.com/rohanmistry231",
            wallsaifrontend:
              "https://github.com/rohanmistry231/AI-Wallpapers-Frontend",
            wallsaibackend:
              "https://github.com/rohanmistry231/AI-Wallpapers-Backend",
            medium: "https://medium.com/@rohanmistry231",
          },
          wallpaperCount: 3300,
          topWallpaper: "top-wallpaper.jpg",
        };

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className={`min-h-screen p-6 mt-14 transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <motion.div
        className={`max-w-4xl mx-auto rounded-lg shadow-lg p-6 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                loading="lazy"
              />
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <a
                  href={`mailto:${user.email}`}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {user.email}
                </a>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p
                className={`mt-2 text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {user.bio}
              </p>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h3 className="text-lg font-medium">Social Media Links</h3>
              <div className="mt-2 space-x-4">
                <a
                  href={user.socialLinks.portfolio || "#"}
                  className="text-lg underline hover:text-gray-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
                <a
                  href={user.socialLinks.linkedin || "#"}
                  className="text-lg underline hover:text-gray-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={user.socialLinks.github || "#"}
                  className="text-lg underline hover:text-gray-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={user.socialLinks.medium || "#"}
                  className="text-lg underline hover:text-gray-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Medium
                </a>
              </div>
            </motion.div>

            {/* Wallpaper Showcase Section */}
            <motion.div
              className={`mt-10 p-6 rounded-lg shadow-lg ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
              }`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <h2 className="text-2xl font-semibold text-center">
                Wallpaper Showcase
              </h2>
              <p className="mt-4 text-center text-lg">
                Over {user.wallpaperCount}+ stunning wallpapers available for
                download and use!
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  High-Quality Designs
                </motion.div>
                <motion.div
                  className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  Easy to Download
                </motion.div>
                <motion.div
                  className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  Variety of Styles
                </motion.div>
                <motion.div
                  className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.8 }}
                >
                  Free to Use
                </motion.div>
              </div>
            </motion.div>

            {/* GitHub Repository Section */}
            <motion.div
              className={`mt-10 p-6 rounded-lg shadow-lg mb-2 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
              }`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <h2 className="text-2xl font-semibold text-center">
                My Walls.ai Codebase
              </h2>
              <p className="mt-4 text-center text-lg">
                Explore the complete source code for this project on GitHub.
                Learn how it’s built and feel free to contribute or star the
                repository.
              </p>
              <div className="mt-4 text-center">
                <a
                  href={user.socialLinks.wallsaifrontend || "#"}
                  className="inline-block bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Walls.ai Frontend CodeBase
                </a>
              </div>
              <div className="mt-4 text-center">
                <a
                  href={user.socialLinks.wallsaibackend || "#"}
                  className="inline-block bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Walls.ai Backend CodeBase
                </a>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
