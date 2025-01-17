"use client";
import React, { useState } from "react";
import styles from "./EventBanner.module.css";
import Image from "next/image";
import RegistrationForm from "./RegistrationForm";

function EventBanner() {
  // State to toggle form visibility
  const [showForm, setShowForm] = useState(false);

  const handleRegisterClick = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  return (
    <div className={styles.bannerContainer} style={{background:"#d0c0a2"}}>
      <div className={styles.registerContent}>
        {/* Show the image and button only if the form is not shown */}
        {!showForm && (
          <>
            <Image
              src="/camp/camp261024.png"
              alt="title-img"
              width={376}
              height={230}
              layout="responsive" // Make the image responsive
            />
            <button
              className={styles.registerButton}
              onClick={handleRegisterClick}
            >
              REGISTER NOW
            </button>
          </>
        )}

        {/* Show the registration form when the button is clicked */}
        {showForm && <RegistrationForm />}
      </div>
    </div>
  );
}

export default EventBanner;
