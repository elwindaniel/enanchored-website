'use client'
import NavBar from "@/components/menu/NavBar";
import styles from "@/styles/Website.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function Home() {
  const router = useRouter(); // Initialize the router

  // Function to handle navigation
  const handleNavigation = () => {
    router.push("/about-us"); // Navigate to /about-us
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroBg}>
        <Image
          src="/herobg.png"
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.heroContent}>
        <NavBar />

        <div className={styles.heroTextContainer}>
          <div className={styles.heroTitle}>GROWING STRONGER IN CHRIST</div>
          <div>
            “We have this hope as an anchor for the soul, firm and secure” Hebrew 6:19
          </div>
          <button
            className={styles.websiteBtn}
            onClick={handleNavigation} // Attach the function to onClick
          >
            Know More {">"}
          </button>
        </div>
        <div style={{height:"50px"}}></div>

      </div>
    </div>
  );
}
