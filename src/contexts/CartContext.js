import React, { createContext, useState, useContext, useEffect } from 'react';
import allData from '../dummy/cartData.json';

const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const allItems = JSON.parse(localStorage.getItem('allItems'));
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if(storedCartItems) setCartItems(storedCartItems);
    if (allItems) setAllItems(allItems); 
    else {
      setAllItems(allData);
      localStorage.setItem('allItems', JSON.stringify(allData));
    }
  }, []);

  const addNewItem = (item) => {
    setAllItems((prevItems) => [...prevItems, item]);
    localStorage.setItem('allItems', JSON.stringify([...allItems, item]));
  };

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
  };

  const removeItemFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeItem = (id) => {
    const updatedAllItems = allItems.filter((item) => item.id !== id);
    setAllItems(updatedAllItems);
    localStorage.setItem('allItems', JSON.stringify(updatedAllItems));
  };

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

  return (
    <CartContext.Provider value={{ allItems, cartItems, addNewItem, removeItem, addItemToCart, removeItemFromCart, updateCartItemName }}>
      {children}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}

export { CartContextProvider, useCartContext };
