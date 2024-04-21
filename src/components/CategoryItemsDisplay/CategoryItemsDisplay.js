import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseConfig'; // Adjust path as necessary
import UniformCard from '../UniformCard/UniformCard';

const CategoryItemsDisplay = () => {
  const { state, district, school, categoryType } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(firestore, "States", state, "Districts", district, "Schools", school, categoryType));
      let itemsWithDetails = snapshot.docs.map(doc => doc.data());
      
      // Sort items based on 'order' attribute
      itemsWithDetails.sort((a, b) => (a.order || 0) - (b.order || 0));

      setItems(itemsWithDetails);
    };
    fetchItems();
  }, [state, district, school, categoryType]);

  return (
    <div className="items-display">
      {items.map((item, index) => (
        <UniformCard key={index} uniform={item} />
      ))}
      {items.length === 0 && <p>No uniforms available for this category.</p>}
    </div>
  );
};

export default CategoryItemsDisplay;
