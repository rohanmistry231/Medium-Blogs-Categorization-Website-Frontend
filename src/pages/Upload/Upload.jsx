import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadComponent = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const correctPassword = "12345";
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    category: "",
    thumbnail: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch stories and check auth on mount
  useEffect(() => {
    const storedAccess = localStorage.getItem("authPassword");
    if (storedAccess === correctPassword) {
      setIsAuthorized(true);
      fetchStories();
    }
  }, []);

  // Fetch all stories
  const fetchStories = async () => {
    try {
      const response = await fetch("https://medium-blogs-categorization-website-backend.vercel.app/stories");
      if (!response.ok) throw new Error("Failed to fetch stories");
      const data = await response.json();
      setStories(data);
      setFilteredStories(data);
    } catch (error) {
      toast.error("Failed to fetch stories");
    }
  };

  // Get unique categories for filter dropdown
  const uniqueCategories = ["All", ...new Set(stories.map((story) => story.category))];

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthorized(true);
      localStorage.setItem("authPassword", password);
      fetchStories();
      toast.success("Successfully logged in!");
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle story submission (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `https://medium-blogs-categorization-website-backend.vercel.app/stories/${editingId}`
        : "https://medium-blogs-categorization-website-backend.vercel.app/stories";
      const method = editingId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(editingId ? "Failed to update story" : "Failed to add story");

      const updatedStory = await response.json();
      if (editingId) {
        setStories(stories.map((story) => (story._id === editingId ? updatedStory : story)));
        setFilteredStories(filteredStories.map((story) => (story._id === editingId ? updatedStory : story)));
        toast.success("Story updated successfully!");
      } else {
        setStories([...stories, updatedStory]);
        setFilteredStories([...filteredStories, updatedStory]);
        toast.success("Story added successfully!");
      }
      setFormData({ title: "", link: "", category: "", thumbnail: "" });
      setEditingId(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle edit story
  const handleEdit = (story) => {
    setFormData({
      title: story.title,
      link: story.link,
      category: story.category,
      thumbnail: story.thumbnail || "",
    });
    setEditingId(story._id);
    setIsModalOpen(true);
  };

  // Handle delete story
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        const response = await fetch(`https://medium-blogs-categorization-website-backend.vercel.app/stories/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete story");
        setStories(stories.filter((story) => story._id !== id));
        setFilteredStories(filteredStories.filter((story) => story._id !== id));
        toast.success("Story deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete story");
      }
    }
  };

  // Handle category search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchCategory(value);
    applyFilters(value, selectedCategory);
  };

  // Handle category filter dropdown
  const handleCategoryFilter = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    applyFilters(searchCategory, value);
  };

  // Apply search and category filters
  const applyFilters = (search, category) => {
    let filtered = stories;
    if (search.trim()) {
      filtered = filtered.filter((story) =>
        story.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") {
      filtered = filtered.filter((story) => story.category === category);
    }
    setFilteredStories(filtered);
  };

  // Open modal for adding new story
  const openAddModal = () => {
    setFormData({ title: "", link: "", category: "", thumbnail: "" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authPassword");
    setIsAuthorized(false);
    setPassword("");
    toast.info("Logged out successfully!");
  };

  return (
    <motion.div
      className={`min-h-screen p-8 mt-14 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme={isDarkMode ? "dark" : "light"} />
      {!isAuthorized ? (
        <motion.form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-md mx-auto space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center">🔒 Admin Login</h2>
          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter secret code"
            className={`w-full p-3 rounded-lg border text-lg ${
              isDarkMode ? "bg-black border-white" : "bg-white border-black"
            }`}
            required
          />
          <motion.button
            type="submit"
            className={`w-full p-3 rounded-lg text-lg font-semibold ${
              isDarkMode ? "bg-white text-black hover:bg-gray-700" : "bg-black text-white hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Submit
          </motion.button>
        </motion.form>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              whileHover={{ scale: 1.05 }}
            >
              Logout
            </motion.button>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              value={searchCategory}
              onChange={handleSearch}
              placeholder="Search by category..."
              className={`flex-grow p-3 rounded-lg border text-lg ${
                isDarkMode ? "bg-black border-white" : "bg-white border-black"
              }`}
            />
            <select
              value={selectedCategory}
              onChange={handleCategoryFilter}
              className={`p-3 rounded-lg border text-lg ${
                isDarkMode ? "bg-black border-white text-white" : "bg-white border-black text-black"
              }`}
            >
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <motion.button
              onClick={openAddModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              Add Story
            </motion.button>
          </div>

          {/* Stories Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-200"}>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Link</th>
                  <th className="px-4 py-2 text-left">Thumbnail</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-2 text-center">
                      No stories found.
                    </td>
                  </tr>
                ) : (
                  filteredStories.map((story) => (
                    <motion.tr
                      key={story._id}
                      className={isDarkMode ? "border-t border-gray-700" : "border-t border-gray-200"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td className="px-4 py-2">{story.title}</td>
                      <td className="px-4 py-2">{story.category}</td>
                      <td className="px-4 py-2">
                        <a
                          href={story.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Link
                        </a>
                      </td>
                      <td className="px-4 py-2">
                        {story.thumbnail ? (
                          <img src={story.thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover" />
                        ) : (
                          "No Thumbnail"
                        )}
                      </td>
                      <td className="px-4 py-2">{new Date(story.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleEdit(story)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                            whileHover={{ scale: 1.05 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(story._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            whileHover={{ scale: 1.05 }}
                          >
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit Story */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Story" : "Add Story"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.label className="block">
                  <span className="block font-medium">Title</span>
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
                  <span className="block font-medium">Link</span>
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
                  <span className="block font-medium">Category</span>
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
                  <span className="block font-medium">Thumbnail URL (Optional)</span>
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
                  />
                </motion.label>
                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    className={`flex-grow p-3 rounded-lg text-lg font-semibold ${
                      isDarkMode ? "bg-white text-black hover:bg-gray-700" : "bg-black text-white hover:bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {editingId ? "Update Story" : "Add Story"}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow p-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UploadComponent;