import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { firestore } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const Checkout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: currentUser?.email || '',
    phoneNumber: '',
    addresses: [{
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }]
  });

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(firestore, 'users', currentUser.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          // Initialize with minimal default values if no document exists
          setDoc(userRef, userDetails);
        }
      }).catch(error => console.error("Failed to fetch or initialize user data:", error));
    }
  }, [currentUser]);

  const handleInputChange = (e, index, field) => {
    const updatedAddresses = userDetails.addresses.map((address, addrIdx) => {
      if (index === addrIdx) {
        return { ...address, [field]: e.target.value };
      }
      return address;
    });
    setUserDetails({ ...userDetails, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    const newAddress = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    };
    setUserDetails(prevState => ({
      ...prevState,
      addresses: [...prevState.addresses, newAddress]
    }));
  };

  const handleRemoveAddress = (index) => {
    setUserDetails(prevState => ({
      ...prevState,
      addresses: prevState.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (currentUser) {
      const userRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userRef, userDetails);
      alert('Checkout successful and user details updated!');
      navigate('/order-confirmation'); // Navigate to an order confirmation page
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={userDetails.email}
          onChange={e => setUserDetails({...userDetails, email: e.target.value})}
          placeholder="Email"
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          value={userDetails.phoneNumber}
          onChange={e => setUserDetails({...userDetails, phoneNumber: e.target.value})}
          placeholder="Phone Number"
        />
      </div>
      {userDetails.addresses.map((address, index) => (
        <div key={index}>
          <h3>Address {index + 1}</h3>
          <input
            type="text"
            value={address.addressLine1}
            onChange={(e) => handleInputChange(e, index, 'addressLine1')}
            placeholder="Address Line 1"
          />
          <input
            type="text"
            value={address.addressLine2}
            onChange={(e) => handleInputChange(e, index, 'addressLine2')}
            placeholder="Address Line 2"
          />
          <input
            type="text"
            value={address.city}
            onChange={(e) => handleInputChange(e, index, 'city')}
            placeholder="City"
          />
          <input
            type="text"
            value={address.state}
            onChange={(e) => handleInputChange(e, index, 'state')}
            placeholder="State"
          />
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) => handleInputChange(e, index, 'postalCode')}
            placeholder="Postal Code"
          />
          <input
            type="text"
            value={address.country}
            onChange={(e) => handleInputChange(e, index, 'country')}
            placeholder="Country"
          />
          <button onClick={() => handleRemoveAddress(index)}>Remove Address</button>
        </div>
      ))}
      <button onClick={handleAddAddress}>Add New Address</button>
      <button onClick={handleSubmit}>Submit Checkout</button>
    </div>
  );
};

export default Checkout;
