// SignUp.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AuthForm.css";
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseConfig'; // Import your Firestore configuration

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup, currentUser, signInWithGoogle, signInWithFacebook } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password);
      // Create a new user document in Firestore after successful signup
      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        phoneNumber: "",  // Assuming you will add phone number field later
        addresses: [],    // Empty array, ready for addresses to be added
        orders: []        // Empty array, ready for order IDs to be added
      });
      navigate('/dashboard'); // Navigate to a dashboard or home page
    } catch (error) {
      alert(error.message); // Handle errors
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithFacebook();
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard"); // Redirect if user is already signed in
    }
  }, [currentUser]);

  return (
    <div className="auth-container">
      <form onSubmit={handleSignUp} className="auth-form">
        <h2>Sign Up</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="auth-button" type="submit">Sign Up</button>
        <button type="button" onClick={handleGoogleSignUp} className="social-login-button google">Sign up with Google</button>
        <button type="button" onClick={handleFacebookSignUp} className="social-login-button facebook">Sign up with Facebook</button>
      </form>
    </div>
  );
};

export default SignUp;
