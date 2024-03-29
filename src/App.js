import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
// Import components
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import AboutUsSection from './components/AboutUsSection/AboutUsSection';
import CategoriesSection from './components/CategoriesSection/CategoriesSection';
import ContactForm from './components/ContactForm/ContactForm';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import { AuthProvider } from "./context/AuthContext";
import Footer from './components/Footer/Footer'; 
import Testimonials from './components/Testimonial/Testimonials';


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
    <AuthProvider> {/* Include AuthProvider from the `main` branch */}
      <Router>
        <ScrollToTop /> {/* This component manages scrolling to sections based on the URL hash */}
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <div id="hero-section"><HeroSection /></div>
                <div id="about-us-section"><AboutUsSection /></div>
                <div id="categories-section"><CategoriesSection /></div>
                <div id="testimonials-section"><Testimonials /></div> {/* Include Testimonials from your branch */}
                <div id="contact-form-section"><ContactForm /></div>
              </>
            } />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer/> {/* Footer remains outside the Routes to persist across different pages */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
