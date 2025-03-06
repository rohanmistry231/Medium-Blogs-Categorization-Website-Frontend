import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

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
      const response = await fetch("http://localhost:5000/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
    <div
      className={`max-h-screen flex items-center justify-center p-8 mt-12 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {!isAuthorized ? (
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold">Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter secret code"
            className={`w-full p-2 rounded border ${
              isDarkMode ? "bg-black border-white" : "bg-white border-black"
            }`}
            required
          />
          <button
            type="submit"
            className={`w-full p-2 rounded ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-700"
                : "bg-black text-white hover:bg-gray-300"
            }`}
          >
            Submit
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold">Add Medium Story</h2>

          <label className="block">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Story Title"
              className={`w-full p-2 rounded border ${
                isDarkMode ? "bg-black border-white" : "bg-white border-black"
              }`}
              required
            />
          </label>

          <label className="block">
            Link:
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Story Link"
              className={`w-full p-2 rounded border ${
                isDarkMode ? "bg-black border-white" : "bg-white border-black"
              }`}
              required
            />
          </label>

          <label className="block">
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className={`w-full p-2 rounded border ${
                isDarkMode ? "bg-black border-white" : "bg-white border-black"
              }`}
              required
            />
          </label>

          <label className="block">
            Thumbnail URL:
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className={`w-full p-2 rounded border ${
                isDarkMode ? "bg-black border-white" : "bg-white border-black"
              }`}
              required
            />
          </label>

          <button
            type="submit"
            className={`w-full p-2 rounded ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-700"
                : "bg-black text-white hover:bg-gray-300"
            }`}
          >
            Submit Story
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadComponent;
