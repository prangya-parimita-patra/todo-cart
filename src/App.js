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
    <CartContextProvider>
      <TodoContextProvider> 
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
          </div>
        </Router>
      </TodoContextProvider>
    </CartContextProvider>
  );
}

export default App;
