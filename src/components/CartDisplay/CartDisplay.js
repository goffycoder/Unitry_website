import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Make sure to import Link
import { useCart } from '../../context/CartContext';
import './CartDisplay.css';

const CartDisplay = () => {
  const { items, removeFromCart, adjustQuantity, calculateSubtotal } = useCart();
  const navigate = useNavigate(); // Hook for navigation

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <div className="cart-container">
      {items.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <Link to="/uniforms" className="btn btn-primary">Start Shopping</Link> {/* Link to the products page */}
        </div>
      ) : (
        items.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-image" />
            <div>
              <h4>{item.name}</h4>
              <p>Size: {item.selectedSize}</p>
              <p>Price: ${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => adjustQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => adjustQuantity(item.id, item.selectedSize, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id, item.selectedSize)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <div className="cart-subtotal">
        <h3>Subtotal: ${calculateSubtotal()}</h3>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartDisplay;
