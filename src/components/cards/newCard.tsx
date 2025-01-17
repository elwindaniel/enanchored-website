// components/common/Card.tsx
import React from "react";
import styles from "@/styles/Website.module.css";

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardDesc}>{content}</div>
    </div>
  );
};

export default Card;
