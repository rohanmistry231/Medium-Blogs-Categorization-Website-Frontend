import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDarkMode = theme === "dark";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "font-semibold text-blue-500"
      : "hover:text-blue-500 transition duration-300";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Upload", path: "/upload" },
    { name: "Developer's Profile", path: "/profile" },
  ];

  // Check if the user is logged in based on the token in localStorage
  const isLoggedIn = localStorage.getItem("token");

  const handleSignOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Optionally, navigate the user to a different page (e.g., Home or Login)
    navigate("/signin");
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 shadow-md transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo and Title */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold tracking-wide"
        >
          <img
            src={isDarkMode ? "wlogo.png" : "blogo.png"}
            alt="Walls.Ai Logo"
            className="h-8 w-8" // Adjust height and width as needed
          />
          <span>
            Own<span className="text-blue-500">.Blogs</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`capitalize ${getLinkClass(link.path)} ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className={`ml-4 px-3 py-1 rounded-lg shadow-md border focus:outline-none transition duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-black border-gray-300"
            }`}
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className={`mr-4 px-2 py-1 rounded-lg shadow-md border focus:outline-none transition duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-black border-gray-300"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={toggleMenu}>
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden bg-opacity-90 transition-all duration-300 ease-in-out fixed top-16 right-0 w-64 h-screen shadow-lg space-y-6 p-6 overflow-y-auto ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={toggleMenu}
            className={`block text-lg capitalize ${getLinkClass(
              link.path
            )} transition-all duration-500 ease-out ${
              isOpen
                ? `opacity-100 translate-x-0 delay-${index * 100}`
                : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {link.name}
          </Link>
        ))}

        {!isLoggedIn && (
          <div className="space-y-4">
            <Link
              to="/signup"
              onClick={toggleMenu}
              className={`block w-full text-center text-lg capitalize px-4 py-2 rounded-md border transition duration-300 ${
                isDarkMode
                  ? "bg-black text-white border-white hover:bg-gray-800"
                  : "bg-white text-black border-black hover:bg-gray-100"
              }`}
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              onClick={toggleMenu}
              className={`block w-full text-center text-lg capitalize px-4 py-2 rounded-md border transition duration-300 ${
                isDarkMode
                  ? "bg-black text-white border-white hover:bg-gray-800"
                  : "bg-white text-black border-black hover:bg-gray-100"
              }`}
            >
              Login
            </Link>
          </div>
        )}

        {isLoggedIn && (
          <div className="space-y-4">
            <button
              onClick={handleSignOut}
              className={`block w-full text-center text-lg capitalize px-4 py-2 rounded-md border transition duration-300 ${
                isDarkMode
                  ? "bg-black text-white border-white hover:bg-gray-800"
                  : "bg-white text-black border-black hover:bg-gray-100"
              }`}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
