import React, { useState } from 'react';
import { useCartContext } from '../contexts/CartContext';
import './ShoppingCart.css';

function ShoppingCart() {
  const { allItems, cartItems, addNewItem, removeItem, addItemToCart, removeItemFromCart, updateCartItemName } = useCartContext();
  const [editItemId, setEditItemId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: 'New Product' };
    addNewItem(newItem);
  };

  const handleAddItemToCart = (item) => {
    addItemToCart(item);
  };

  const handleRemoveItemFromCart = (id) => {
    removeItemFromCart(id);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
    setEditItemId(null);
  };

  const handleEditItem = (item) => {
    setEditItemId(item.id);
    setEditedName(item.name);
  };

  const handleSaveEdit = () => {
    updateCartItemName(editItemId, editedName);
    setEditItemId(null);
    setEditedName('');
  };

  return (
    <div className="cart">
      <button className="btn-add" onClick={handleAddItem}>Add Item</button>
      <ul>
        {allItems.map((item) => (
          <li key={item.id}>
            {editItemId === item.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              item.name
            )}
            {editItemId === item.id ? (
              <button className="btn-save" onClick={handleSaveEdit}>Save</button>
            ) : (
              <div>
                {cartItems.includes(item) ? (
                  <button className="btn-remove" onClick={() => handleRemoveItemFromCart(item.id)}>Remove From Cart</button>
                ) : (
                  <button className="btn-add" onClick={() => handleAddItemToCart(item)}>Add To Cart</button>
                )}
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
