import React from 'react';
import './UniformCard.css';  // Make sure this CSS file exists and is correctly linked

const UniformCard = ({ uniform }) => {
  return (
    <div className="category-card">
      <div className="card-image-container">
        <img src={uniform.imageUrl || 'default-placeholder.png'} alt={uniform.name} className="category-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{uniform.name}</h3>
        <p className="card-description">{uniform.description}</p>
        <p className="card-price">Price: {uniform.price}</p>
        <button className="card-cta-button">View Details</button>
      </div>
    </div>
  );
};

export default UniformCard;
