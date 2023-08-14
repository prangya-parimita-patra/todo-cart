import React from 'react';
import TodoList from './TodoList';
import ShoppingCart from './ShoppingCart';
import ApiData from './ApiData';
// import './Home.css'; // Import your CSS file

function Home() {
  return (
    <>
      <div className="home">
        <div className="home-section">
          <h2>Your To-Do List</h2>
          <TodoList />
        </div>
        <div className="home-section">
          <h2>Your Shopping Cart</h2>
          <ShoppingCart />
        </div>
      </div>
      <div className="home-section">
        <h2>Fetch API Data from Externl API</h2>
        <ApiData />
      </div>
    </>
  );
}

export default Home;
