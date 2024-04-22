import React, { useState, useContext } from 'react';
import './UniformCard.css';
import { useCart } from '../../context/CartContext';
import { Toast } from '../Toast'; 

const UniformCard = ({ uniform }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      ...uniform,
      selectedSize,
      quantity
    });
    Toast('Added to cart successfully', 'success'); // Assuming you have a Toast function for notifications
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const renderSizeOptions = () => {
    return Object.entries(uniform.sizes).map(([size, details]) => (
      <option key={size} value={size}>{size}</option>
    ));
  };

  return (
    <div className="uniform-card">
      <img src={uniform.imageUrl || 'default-placeholder.png'} alt={uniform.name} className="uniform-image" />
      <div className="card-content">
        <h3 className="uniform-name">{uniform.name}</h3>
        <p className="uniform-description">{uniform.description}</p>
        <select className="size-select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">Select Size</option>
          {renderSizeOptions()}
        </select>
        <div className="quantity-controls">
          <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <p className="uniform-price">Price: ${uniform.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default UniformCard;
