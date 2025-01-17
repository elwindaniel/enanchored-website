import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  data: {
    img: string;
    sub: string;
    title: string;
    desc: string;
    action: string;
    redirectTo: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="card-container">
      <Image
        src={data.img}
        alt="title-img"
        width={1000}
        height={1000}
        style={{ objectFit: 'cover', width: '100%', height: '350px' }}
      />
      <div className="card-text-section">
        <div className="card-sub-text">{data.sub}</div>
        <div className="card-title-text">{data.title}</div>
        <div className="card-desc-text">{data.desc}</div>
        <Link href={data.redirectTo}>
        <button className="btn-one">{data.action}</button>
        </Link>
       
      </div>
    </div>
  );
};

export default Card;
