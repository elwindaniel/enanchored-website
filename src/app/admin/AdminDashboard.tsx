"use client"; // Mark this component as a client component

import { useState } from "react";
import styles from "@/styles/Admin.module.css";
import AdminMenu from "@/components/menu/AdminMenu";
import { FaBars } from "react-icons/fa"; // Hamburger icon

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={{ width: "100%" }}>
      <button className={styles.MenuToggle} onClick={toggleMenu}>
        <FaBars />
      </button>
      <div style={{display:` ${menuOpen ? "block" : "none"}`}}>
        <AdminMenu />
      </div>
      <div className={styles.AdminMobileView}><AdminMenu /></div>
      <div className={styles.AdminDashboardBody}>{children}</div>
    </div>
  );
}
