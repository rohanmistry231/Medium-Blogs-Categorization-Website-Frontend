import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Upload from "./pages/Upload/Upload";
import AdminPanel from "./pages/Admin/AdminPanel";

function App() {
  const { isDarkMode } = useTheme();

  return (
    <Router
      future={{
        v7_relativeSplatPath: true, // Opt into the new v7 relative splat path behavior
        v7_startTransition: true, // Opt into state transition handling
      }}
    >
      <div
        className={`flex flex-col min-h-screen ${
          isDarkMode ? "dark" : "light"
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const MainApp = () => (
  <ThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

export default MainApp;
