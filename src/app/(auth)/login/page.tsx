// app/login/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Form.module.css';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      const { role } = response.data;

      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'coordinator') {
        router.push('/coordinator');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.bannerContainer}  style={{background:"#d0c0a2"}}>
      <div className={styles.registerContent}>
        <div className={styles.logoText}>Enanchored</div>
        {message && <p className={styles.errorMessage}>{message}</p>}
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className={styles.registerButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
