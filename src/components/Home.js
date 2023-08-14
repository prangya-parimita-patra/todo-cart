import React from 'react';
import TodoList from './TodoList';
import ShoppingCart from './ShoppingCart';
import ApiData from './ApiData';

function Home() {
  return (
    <>
      {/* Main home container */}
      <div className="home">
        {/* To-Do List section */}
        <div className="home-section">
          <h2>Your To-Do List</h2>
          {/* Render TodoList component */}
          <TodoList />
        </div>
        {/* Shopping Cart section */}
        <div className="home-section">
          <h2>Your Shopping Cart</h2>
          {/* Render ShoppingCart component */}
          <ShoppingCart />
        </div>
      </div>
      {/* API Data section */}
      <div className="home-section">
        <h2>Fetch API Data from External API</h2>
        {/* Render ApiData component */}
        <ApiData />
      </div>
    </>
  );
}

export default Home;
