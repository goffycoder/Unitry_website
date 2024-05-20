// UserProfile.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { firestore } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    email: '',
    phoneNumber: '',
    addresses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(firestore, 'users', currentUser.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
        setLoading(false);
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const key = name.split('-')[0];
    const updatedAddresses = [...profile.addresses];
    updatedAddresses[index][key] = value;
    setProfile({ ...profile, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    setProfile(prevState => ({
      ...prevState,
      addresses: [...prevState.addresses, {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      }]
    }));
  };

  const handleRemoveAddress = (index) => {
    setProfile(prevState => ({
      ...prevState,
      addresses: prevState.addresses.filter((_, idx) => idx !== index)
    }));
  };

  const handleSave = async () => {
    const userRef = doc(firestore, 'users', currentUser.uid);
    await updateDoc(userRef, profile);
    alert('Profile updated successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <input
        type="text"
        name="email"
        value={profile.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phoneNumber"
        value={profile.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      {profile.addresses.map((address, index) => (
        <div key={index}>
          <h4>Address {index + 1}</h4>
          <input type="text" name={`addressLine1-${index}`} value={address.addressLine1} onChange={(e) => handleAddressChange(e, index)} placeholder="Address Line 1" />
          <input type="text" name={`addressLine2-${index}`} value={address.addressLine2} onChange={(e) => handleAddressChange(e, index)} placeholder="Address Line 2" />
          <input type="text" name={`city-${index}`} value={address.city} onChange={(e) => handleAddressChange(e, index)} placeholder="City" />
          <input type="text" name={`state-${index}`} value={address.state} onChange={(e) => handleAddressChange(e, index)} placeholder="State" />
          <input type="text" name={`postalCode-${index}`} value={address.postalCode} onChange={(e) => handleAddressChange(e, index)} placeholder="Postal Code" />
          <input type="text" name={`country-${index}`} value={address.country} onChange={(e) => handleAddressChange(e, index)} placeholder="Country" />
          <button onClick={() => handleRemoveAddress(index)}>Remove Address</button>
        </div>
      ))}
      <button onClick={handleAddAddress}>Add New Address</button>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default UserProfile;
