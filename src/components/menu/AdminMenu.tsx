'use client';
import styles from '@/styles/Admin.module.css';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Reusable MenuItem component
const MenuItem = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();

  // Determine if this menu item is active
  const isActive = pathname === href;

  return (
    <Link href={href} className={isActive ? styles.AdminMenuActive : styles.AdminMenu}>
      {label}
    </Link>
  );
};

function AdminMenu() {
  return (
    <div className={styles.AdminMenuContainer}>
      <div className={styles.AdminLogoText}>Enanchored</div>
      <div className={styles.AdminMenuGroup}>
        <MenuItem href="/admin" label="Dashboard" />
        <MenuItem href="/admin/camp-reg" label="Camp Reg" />
        <MenuItem href="/admin/questions" label="Questions" />
        <MenuItem href="/admin/income" label="Income" />
        <MenuItem href="/admin/users" label="Users" />
      </div>
    </div>
  );
}

export default AdminMenu;
