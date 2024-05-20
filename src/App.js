import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Import components
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import AboutUsSection from './components/AboutUsSection/AboutUsSection';
import CategoriesSection from './components/CategoriesSection/CategoriesSection';
import ContactForm from './components/ContactForm/ContactForm';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Footer from './components/Footer/Footer'; 
import Testimonials from './components/Testimonial/Testimonials';
import UniformSelector from './components/UniformSelector/UniformSelector';
import GendersAndProductCategories from './components/GendersAndProductCategories/GendersAndProductCategories';
import CategoryItemsDisplay from './components/CategoryItemsDisplay/CategoryItemsDisplay';
import CartDisplay from './components/CartDisplay/CartDisplay';
import UserProfile from './components/Header/UsersProfile';  
import OrderHistory from './components/Header/OrdersHistory';
import Checkout from './components/Checkout/Checkout';

// Import context
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";


const ScrollToTop = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "") {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [hash]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <div id="hero-section"><HeroSection /></div>
                  <div id="about-us-section"><AboutUsSection /></div>
                  <div id="categories-section"><CategoriesSection /></div>
                  <div id="testimonials-section"><Testimonials /></div>
                  <div id="contact-form-section"><ContactForm /></div>
                </>
              } />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/uniforms" element={<UniformSelector />} />
              <Route path="/genders-and-product-categories/:state/:district/:school" element={<GendersAndProductCategories />} />
              <Route path="/category-items-display/:state/:district/:school/:categoryType" element={<CategoryItemsDisplay />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/cart" element={<CartDisplay />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
