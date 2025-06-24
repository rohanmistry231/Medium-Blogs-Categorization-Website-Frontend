import React from "react";
import { useTheme } from "../context/ThemeContext"; // Adjust the path if necessary

const Footer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark"; // Check if dark mode is active

  return (
    <footer
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      } pb-8 shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2
              className={`text-2xl font-semibold mt-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Medi<span className="text-blue-500">Hub</span>
            </h2>
            <p
              className={`mt-2 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Discover and explore captivating Medium stories — thoughtfully categorized for your curiosity.
            </p>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3
              className={`text-lg font-semibold mt-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a
                href="https://github.com/rohanmistry231"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/rohan-mistry-493987202/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                LinkedIn
              </a>
              <a
                href="https://medium.com/@rohanmistry231"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Medium
              </a>
              <a
                href="https://irohanportfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`border-t mt-6 pt-4 text-center text-xs ${
            isDarkMode
              ? "border-gray-700 text-gray-500"
              : "border-gray-300 text-gray-500"
          }`}
        >
          &copy; {new Date().getFullYear()} Medi
          <span className="text-blue-500">Hub</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
