import { createContext, useEffect, useState } from "react";

// Create the context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check localStorage or default to dark
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  // Apply theme to <html> whenever it changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Tailwind sees this
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // Save preference
  }, [theme]);

  // Function to toggle dark/light
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;