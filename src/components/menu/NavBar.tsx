// components/NavBar.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/Navbar.module.css";
import Image from "next/image";

interface NavBarProps {
  title?: string;
  description?: string;
}

export default function NavBar({ title, description }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav style={{ background: "#F2F2F2", color: "#000", borderRadius: "16px" }}>
      <div className={styles.navbar}>
        <div className={styles.navbarLogoContainer}>
          <Image
            src="/red-logo.png"
            alt="title-img"
            width={45}
            height={28.64}
          />
          <Link href="/" className={styles.navbarLogo} style={{marginLeft:"8px"}}>
            ENANCHORED
          </Link>
        </div>
        <div className={`nav-bar-menu ${menuOpen ? "open" : ""}`}>
          <Link href="/about-us" className={styles.navbarMenu}>
            About us
          </Link>
          {/* <Link href="/blogs" className={styles.navbarMenu}>
            Blog
          </Link> */}
          <Link href="/contact-us" className={styles.navbarMenu}>
            Contact us
          </Link>
        </div>
        <button className={styles.navMeneToggle} onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Conditionally render the content only if title or description exists */}
      {(title || description) && (
        <div className={styles.navbarContent}>
          {title && <div className={styles.navbarContentTitle}>{title}</div>}
          {description && (
            <div className={styles.navbarContentDesc}>{description}</div>
          )}
        </div>
      )}
    </nav>
  );
}
