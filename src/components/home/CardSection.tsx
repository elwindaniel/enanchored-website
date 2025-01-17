import Card from "../cards/card";

function CardSection() {
  return (
    <div className="card-section">
      <div className="card-section-container">
       {cardData.map((card,index)=><Card data={card} key={index}/>) }
      </div>
    </div>
  );
}

const cardData =[{
  img: "/Youth-Camp.webp",
  sub: "ONE DAY MEETING",
  title: "Youth Meeting",
  desc: "Join us for a Christian youth meeting at the Seaham Youth Center, Strangford Rd, Seaham SR7 8QE, on 26th October 2024, from 9:30 am to 4:00 pm. It's a day filled with fellowship, fun, and faith—don't miss out!",
  action: "Register Now",
  redirectTo:"/26-oct-2024"
},{
  img: "/card1.jpg",
  sub: "EMPOWERING GENERATIONS",
  title: "Join Enanchored",
  desc: "We are committed to enriching the lives of young people. Our mission is to mentor and prepare the next generation for their divine roles in global missions, fostering both spiritual and personal growth through our dedicated programs.",
  action: "Join Us",
  redirectTo:"/contact-us"
}]
// const Card = () => {
//   return (
//     <div className="card-container">
//       <Image
//         src="/card1.jpg"
//         alt="title-img"
//         width={1000}
//         height={1000}
//         style={{ objectFit: "cover", width: "100%", height: "350px" }}
//       />
//       <div className="card-text-section">
//         <div className="card-sub-text">Our Calendar</div>
//         <div className="card-title-text">See What’s Happening</div>
//         <div className="card-desc-text">
//           Check out this month's events to find out what's happening and how you
//           can be involved. Explore the full list of upcoming ministries and
//           services.
//         </div>
//         <button className="btn-one">Join us</button>
//       </div>
//     </div>
//   );
// };

export default CardSection;
