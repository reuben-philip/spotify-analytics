import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './login'; // 👈 make sure this path is correct

// --- TypingAnimation Component ---
const TypingAnimation = ({ sentences, typingSpeed = 20, pauseDuration = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentSentence = sentences[currentSentenceIndex];

  useEffect(() => {
    let timer;
    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setCurrentIndex(0);
      } else {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, typingSpeed / 2);
      }
    } else {
      if (currentIndex < currentSentence.length) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev + currentSentence[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    }
    return () => clearTimeout(timer);
  }, [currentIndex, currentSentence, displayText, isDeleting, isPaused, pauseDuration, sentences, typingSpeed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      {displayText}
      <span style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
    </>
  );
};

// --- Home Page ---
const Home = () => {
  const sentences = [
    "Explore your music listening patterns and discover new insights.",
    "Find out which artists you listen to the most.",
    "Discover your top genres and how they've changed over time.",
    "See which songs have dominated your playlists this year.",
    "Get personalized recommendations based on your listening habits."
  ];

  return (
    <>
      <header className="header-style">
        <h1>Spotify Analytics</h1>
      </header>

      <div className="paragraph-style">
        <TypingAnimation
          sentences={sentences}
          typingSpeed={25}
          pauseDuration={2000}
        />
      </div>

      <div className="gradient-button-wrapper">
        <Link to="/login">
          <button>
            <span className="text">Login</span>
          </button>
        </Link>
      </div>
    </>
  );
};

// --- Main App Component ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
