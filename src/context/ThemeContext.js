import { createContext, useState, useContext, useEffect } from "react";

// Vintage Black-and-White Theme Palette with Improved Aesthetics
const themes = {
  dark: {
    background: "#000000", // Black background for dark mode
    color: "#e0e0e0", // Soft white text for reduced eye strain
    scrollbarTrack: "#1f1f1f", // Slightly lighter dark gray for scrollbar track
    scrollbarThumb: "#424242", // Gray for scrollbar thumb
    scrollbarThumbHover: "#616161", // Lighter gray for hover effect
  },
  light: {
    background: "#ffffff", // Pure white background for light mode
    color: "#212121", // Dark gray text for softer contrast
    scrollbarTrack: "#e0e0e0", // Light gray for scrollbar track
    scrollbarThumb: "#bdbdbd", // Medium gray for scrollbar thumb
    scrollbarThumbHover: "#9e9e9e", // Slightly darker gray for hover effect
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const currentTheme = themes[theme];
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.color;

    // Apply custom scrollbar styles
    document.documentElement.style.setProperty(
      "--scrollbar-track-color",
      currentTheme.scrollbarTrack
    );
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-color",
      currentTheme.scrollbarThumb
    );
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-hover-color",
      currentTheme.scrollbarThumbHover
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
