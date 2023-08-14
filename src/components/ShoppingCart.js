import React, { useState } from 'react';
import { useCartContext } from '../contexts/CartContext';
import './ShoppingCart.css';

function ShoppingCart() {
  // Destructure required functions and data from the CartContext
  const { allItems, cartItems, addNewItem, removeItem, addItemToCart, removeItemFromCart, updateCartItemName } = useCartContext();

  // State for editing item name
  const [editItemId, setEditItemId] = useState(null);
  const [editedName, setEditedName] = useState('');

  // Handle adding a new item to the list
  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: 'New Product' };
    addNewItem(newItem);
  };

  // Handle adding an item to the cart
  const handleAddItemToCart = (item) => {
    addItemToCart(item);
  };

  // Handle removing an item from the cart
  const handleRemoveItemFromCart = (id) => {
    removeItemFromCart(id);
  };

  // Handle removing an item from the list
  const handleRemoveItem = (id) => {
    removeItem(id);
    setEditItemId(null);
  };

  // Handle initiating item name edit
  const handleEditItem = (item) => {
    setEditItemId(item.id);
    setEditedName(item.name);
  };

  // Handle saving the edited item name
  const handleSaveEdit = () => {
    updateCartItemName(editItemId, editedName);
    setEditItemId(null);
    setEditedName('');
  };

  return (
    <div className="cart">
      {/* Add new item button */}
      <button className="btn-add" onClick={handleAddItem}>Add Item</button>
      <ul>
        {allItems.map((item) => (
          <li key={item.id}>
            {/* Edit or display item name */}
            {editItemId === item.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              item.name
            )}
            {/* Edit or save button */}
            {editItemId === item.id ? (
              <button className="btn-save" onClick={handleSaveEdit}>Save</button>
            ) : (
              <div>
                {/* Handle Add/Remove from cart */}
                {cartItems.includes(item) ? (
                  <button className="btn-remove" onClick={() => handleRemoveItemFromCart(item.id)}>Remove From Cart</button>
                ) : (
                  <button className="btn-add" onClick={() => handleAddItemToCart(item)}>Add To Cart</button>
                )}
                {/* Edit and Remove buttons */}
                <button className="btn-edit" onClick={() => handleEditItem(item)}>Edit</button>
                <button className="btn-remove" onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
