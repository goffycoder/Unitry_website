import React, { useState } from 'react';
import './UniformCard.css'; // Ensure this is the correct path to the CSS file

const UniformCard = ({ uniform }) => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const renderSizeOptions = () => {
    if (!uniform.sizes) {
      return <p>No sizes available</p>; // Or any other placeholder content
    }
  
    return Object.entries(uniform.sizes).map(([size, details]) => (
      <option key={size} value={size}>
        {size} - {details.stock} in stock
      </option>
    ));
  };
  
  return (
    <div className="uniform-card">
      <img src={uniform.imageUrl || 'default-placeholder.png'} alt={uniform.name} className="uniform-image" />
      <div className="card-content">
        <h3 className="uniform-name">{uniform.name}</h3>
        <p className="uniform-description">{uniform.description}</p>
        <select className="size-select" value={selectedSize} onChange={handleSizeChange}>
          <option value="">Select Size</option>
          {renderSizeOptions()}
        </select>
        {selectedSize && uniform.sizes[selectedSize].stock < 10 && (
          <p className="stock-alert">Few left!</p>
        )}
        <p className="uniform-price">Price: ${uniform.price}</p>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default UniformCard;
