import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GendersAndProductCategories.css';
import maleUniformImage from './boy.png';  // Adjust path as necessary
import femaleUniformImage from './girl_uniform.png';  // Adjust path as necessary
import mostSellingProductImage from './most.png';  // Adjust path as necessary

const GendersAndProductCategories = () => {
  const navigate = useNavigate();
  const { state, district, school } = useParams();

  const goToCategoryItems = (categoryType) => {
    navigate(`/category-items-display/${state}/${district}/${school}/${categoryType}`);
  };

  return (
    <div className="categories-container">
      <h1>Select a Category</h1>
      <div className="category-buttons">
        <div className="category-item" onClick={() => goToCategoryItems('Male')}>
          <img src={maleUniformImage} alt="Boy Uniforms" />
          <p>Boys Uniforms</p>
        </div>
        <div className="category-item" onClick={() => goToCategoryItems('Female')}>
          <img src={femaleUniformImage} alt="Girl Uniforms" />
          <p>Girls Uniforms</p>
        </div>
        <div className="category-item" onClick={() => goToCategoryItems('MostSellingProduct')}>
          <img src={mostSellingProductImage} alt="Most Selling Products" />
          <p>Most Selling Products</p>
        </div>
      </div>
    </div>
  );
};

export default GendersAndProductCategories;
