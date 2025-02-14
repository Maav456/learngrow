import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import "./App.css";

const Button = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="button"
  >
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="card">
    {children}
  </div>
);

const QuoteFetcher = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      setQuote("Failed to fetch quote. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="nav-container">
        <div className="nav-content">
          <a href="/" className="logo">LearnGrow</a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`bar ${menuOpen ? "rotate1" : ""}`}></span>
            <span className={`bar ${menuOpen ? "hidden" : ""}`}></span>
            <span className={`bar ${menuOpen ? "rotate2" : ""}`}></span>
          </button>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="https://learngrow.onrender.com/yourfeedback.html">Your Feedback</a></li>
            <li><a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Learn with AI</a></li>
            <li><a href="https://learngrow.onrender.com/adminlogin.html" id="adminloginlink">Admin</a></li>
          </ul>
        </div>
      </nav>

      {/* Quote Fetcher */}
      <div className="center bg-gradient">
        <Card>
          <motion.h1 className="card-heading">
            🌟 Inspirational Quote 🌟
          </motion.h1>
          <motion.p className="quote-text">
            {loading ? <Loader2 className="loader" /> : `"${quote}"`}
          </motion.p>
          <Button onClick={fetchQuote} disabled={loading}>
            {loading ? "Fetching..." : "New Quote"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuoteFetcher;
