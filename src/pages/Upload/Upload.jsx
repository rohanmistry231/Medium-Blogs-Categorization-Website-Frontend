import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const UploadComponent = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const correctPassword = "12345";
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    const storedAccess = localStorage.getItem("authPassword");
    if (storedAccess === correctPassword) {
      setIsAuthorized(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthorized(true);
      localStorage.setItem("authPassword", password);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://medium-blogs-categorization-website-backend.vercel.app/stories",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add story.");
      }

      alert("Story added successfully!");
      setFormData({ title: "", link: "", category: "", thumbnail: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add story. Please try again.");
    }
  };

  return (
    <motion.div
      className={`max-h-screen flex items-center justify-center p-8 mt-14 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {!isAuthorized ? (
        <motion.form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-md space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center">🔒 Prove You're Worthy! Enter the Secret Code:</h2>
          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter secret code"
            className={`w-full p-3 rounded-lg border text-lg ${
              isDarkMode ? "bg-black border-white" : "bg-white border-black"
            }`}
            whileFocus={{ scale: 1.05 }}
            required
          />
          <motion.button
            type="submit"
            className={`w-full p-3 rounded-lg text-lg font-semibold ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-700"
                : "bg-black text-white hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Submit
          </motion.button>
        </motion.form>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">Add <span className="text-blue-500">Medium Story</span></h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.label className="block">
              <span className="block font-medium text-lg">Title</span>
              <motion.input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter story title"
                className={`w-full p-3 rounded-lg border text-lg ${
                  isDarkMode ? "bg-black border-white" : "bg-white border-black"
                }`}
                whileFocus={{ scale: 1.05 }}
                required
              />
            </motion.label>

            <motion.label className="block">
              <span className="block font-medium text-lg">Link</span>
              <motion.input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Enter story link"
                className={`w-full p-3 rounded-lg border text-lg ${
                  isDarkMode ? "bg-black border-white" : "bg-white border-black"
                }`}
                whileFocus={{ scale: 1.05 }}
                required
              />
            </motion.label>

            <motion.label className="block">
              <span className="block font-medium text-lg">Category</span>
              <motion.input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter story category"
                className={`w-full p-3 rounded-lg border text-lg ${
                  isDarkMode ? "bg-black border-white" : "bg-white border-black"
                }`}
                whileFocus={{ scale: 1.05 }}
                required
              />
            </motion.label>

            <motion.label className="block">
              <span className="block font-medium text-lg">Thumbnail URL</span>
              <motion.input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="Enter thumbnail URL"
                className={`w-full p-3 rounded-lg border text-lg ${
                  isDarkMode ? "bg-black border-white" : "bg-white border-black"
                }`}
                whileFocus={{ scale: 1.05 }}
                required
              />
            </motion.label>
          </div>

          <motion.button
            type="submit"
            className={`w-full p-3 rounded-lg text-lg font-semibold mt-4 ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-700"
                : "bg-black text-white hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Submit Story
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default UploadComponent;
