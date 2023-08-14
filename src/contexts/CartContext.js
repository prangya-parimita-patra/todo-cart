import React, { createContext, useState, useContext, useEffect } from 'react';
import allData from '../dummy/cartData.json';

// Create a CartContext using createContext
const CartContext = createContext();

// CartContextProvider component that wraps the application and provides context
function CartContextProvider({ children }) {
  // State for cart items and all items
  const [cartItems, setCartItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  // Load data from localStorage or initialize with dummy data on initial render
  useEffect(() => {
    const allItems = JSON.parse(localStorage.getItem('allItems'));
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (storedCartItems) setCartItems(storedCartItems);
    if (allItems) setAllItems(allItems);
    else {
      setAllItems(allData);
      localStorage.setItem('allItems', JSON.stringify(allData));
    }
  }, []);

  // Add a new item to the list of all items
  const addNewItem = (item) => {
    setAllItems((prevItems) => [...prevItems, item]);
    localStorage.setItem('allItems', JSON.stringify([...allItems, item]));
  };

  // Add an item to the cart
  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
  };

  // Remove an item from the cart
  const removeItemFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Remove an item from the list of all items
  const removeItem = (id) => {
    const updatedAllItems = allItems.filter((item) => item.id !== id);
    setAllItems(updatedAllItems);
    localStorage.setItem('allItems', JSON.stringify(updatedAllItems));
  };

  // Update the name of an item in both cart and all items
  const updateCartItemName = (id, newName) => {
    const updatedAllItems = allItems.map((item) =>
      item.id === id ? { ...item, name: newName } : item
    );
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, name: newName } : item
    );
    setCartItems(updatedCartItems);
    setAllItems(updatedAllItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('allItems', JSON.stringify(updatedAllItems));
  };

  // Provide the context values to the components
  return (
    <CartContext.Provider value={{ allItems, cartItems, addNewItem, removeItem, addItemToCart, removeItemFromCart, updateCartItemName }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
function useCartContext() {
  return useContext(CartContext);
}

export { CartContextProvider, useCartContext };
