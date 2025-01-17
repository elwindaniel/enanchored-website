// pages/working-on-it.tsx

import React from "react";
import styles from "@/styles/WorkingOnIt.module.css";
import NavBar from "@/components/menu/NavBar";
import Footer from "@/components/menu/Footer";

const WorkingOnIt = () => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.animation}>
          <div className={styles.loader}></div>
          <div className={styles.workingText}>We are working on it...</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkingOnIt;
