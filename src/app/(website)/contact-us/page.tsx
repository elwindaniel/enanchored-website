// pages/working-on-it.tsx
import styles from "@/styles/Website.module.css";
import ContactForm from "@/components/forms/ContactForm";
import Footer from "@/components/menu/Footer";
import NavBar from "@/components/menu/NavBar";
import React from "react";

const WorkingOnIt = () => {
  return (
    <div className={styles.content}>
    <NavBar/>
    <div className="contact-us">
      <div className="side-section">
        <div className="contact-card-title">Contact us</div>
        <div className="contact-card">
          <h2 className="contact-card-title">Address</h2>
          <p className="contact-card-des">4 Park street, Seaham, SR7 7TG</p>
        </div>
        <div className="contact-card">
          <h2 className="contact-card-title">Phone</h2>
          <p className="contact-card-des">+44 7776684128</p>
        </div>
        <div className="contact-card">
          <h2 className="contact-card-title">Email</h2>
          <p className="contact-card-des">admin@enanchored.com</p>
        </div>
        
      </div>
      <div className="side-section">
        <div className="contact-us-form">
         <ContactForm/>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default WorkingOnIt;
