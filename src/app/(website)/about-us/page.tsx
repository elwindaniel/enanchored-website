// pages/working-on-it.tsx
import React from "react";
import styles from "@/styles/Website.module.css";
import Footer from "@/components/menu/Footer";
import NavBar from "@/components/menu/NavBar";
import Card from "@/components/cards/newCard";

const AboutUs = () => {
  return (
    <div className={styles.content}>
      <NavBar
        title="About Us"
        description="At Enanchored, We are boldly committed to pursuing God and helping others grow in their relationship with Him. We live to experience His presence, share the powerful message of the gospel, and build a strong, genuine community centered on His love.
                     We believe faith is a journey that shouldn’t be walked alone. That’s why we invite you to join us in discovering God like never before. Whether you want to grow closer to Christ, connect with a passionate group of believers, or develop your faith, Enanchored offers a place where you can experience God’s grace and power in new and meaningful ways."
      />
      <div className={styles.cardsRow}>
        <Card
          title="Who We Are ?"
          content={`"Then he said to his disciples, ‘The harvest is plentiful, but the workers are few.’" — Matthew 9:37 (NIV)
          our mission is to inspire and equip individuals to share the love and message of Jesus Christ with others. We created Enanchored to support and encourage believers in their journey of faith, empowering them to make disciples and spread the gospel. Through our programs and resources, we provide practical tools, training, and a supportive community to help you grow in your faith and reach out to others. Our focus is on building up Christians to live out their calling in everyday life. We offer discipleship, leadership training, and mentorship programs designed to equip individuals to serve their local communities and impact the world for Christ. Whether through events, social media, or in-person training, we aim to make evangelism accessible and impactful.`}
        />

        <Card
          title="What We Do ?"
          content={`We are dedicated to helping people grow in their faith and share the message of Jesus through various channels. We use social media to spread the gospel, share inspiring content, and engage with believers on faith-based topics in the digital space. Our events, including conferences and community gatherings, bring people together for worship, fellowship, and learning, equipping them to live out their faith. We also offer Bible studies that dive deep into Scripture, helping individuals apply biblical truths to their lives. Additionally, we foster open discussions where believers can explore their faith, ask questions, and encourage one another. Through these activities, we create opportunities for people to experience God, build meaningful relationships, and grow as disciples of Christ.`}
        />
      </div>
      {/* <Card
        title="What We Believe ?"
        content={`We believe in empowering believers to boldly live out and share their faith, overcoming fear and spreading the message of Jesus Christ. We believe the Bible is God’s infallible, inspired Word and the final authority in all matters of faith and life. We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit. We believe in the deity of Jesus Christ, who was born of the Virgin Mary, lived a sinless life, took the sins of humanity upon Himself, died, rose again, and will return in glory. Salvation comes only through Jesus, and through repentance and faith in Him, we are given new life by the Holy Spirit. We believe the Holy Spirit lives within every believer, empowering them to live a godly life. We believe in the resurrection of all people, leading to eternal life for the saved and eternal separation for the lost. Finally, we believe in the unity of all true believers in Jesus Christ, who make up His Church, and we are committed to spreading the gospel and making disciples of all nations.`}
      /> */}

      <Footer />
    </div>
  );
};

export default AboutUs;
