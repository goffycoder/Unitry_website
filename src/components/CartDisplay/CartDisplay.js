import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartDisplay.css';

const CartDisplay = () => {
  const { items, removeFromCart, adjustQuantity } = useCart();

  return (
    <div className="cart-container">
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-image" />
            <div>
              <h4>{item.name}</h4>
              <p>Size: {item.selectedSize}</p>
              <p>Price: ${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => adjustQuantity(item.id, item.selectedSize, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => adjustQuantity(item.id, item.selectedSize, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id, item.selectedSize)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartDisplay;
