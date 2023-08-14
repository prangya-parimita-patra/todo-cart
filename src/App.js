import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { CartContextProvider } from './contexts/CartContext';
import { TodoContextProvider } from './contexts/TodoContext';
import './App.css';

function App() {
  return (
    // Wrap the entire application with CartContextProvider and TodoContextProvider
    <CartContextProvider>
      <TodoContextProvider>
        {/* Set up the React Router */}
        <Router>
          <div className="App">
            {/* Render the Header component at the top */}
            <Header />
            {/* Define routes for different pages */}
            <Routes>
              {/* Route for the Home page */}
              <Route path="/" element={<Home />} />
              {/* Route for the About page */}
              <Route path="/about" element={<About />} />
              {/* Route for the Contact page */}
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </TodoContextProvider>
    </CartContextProvider>
  );
}

export default App;
