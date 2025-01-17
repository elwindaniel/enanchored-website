import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-bg">
        <Image
          src="/bg-img.jpg"
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-bg-layer"></div>
      <div className="hero-content">
        <Image src="/title-img.png" alt="title-img" width={500} height={140} />
        <div className="hero-btn-holder">
          <button className="btn-one">connect with us</button>
          <button className="btn-two">know more</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
