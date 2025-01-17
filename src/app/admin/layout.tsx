import { Montserrat } from 'next/font/google';
import styles from '@/styles/Admin.module.css';
import AdminMenu from '@/components/menu/AdminMenu';
import AdminDashboard from './AdminDashboard';

const montserrat = Montserrat({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Admin Enanchored',
  description: 'Enanchored Admin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${styles.AdminDashboard}`}>
        <AdminDashboard >
        {children}</AdminDashboard>
      </body>
    </html>
  );
}
