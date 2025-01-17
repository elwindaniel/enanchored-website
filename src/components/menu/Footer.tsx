import Link from "next/link";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="nav-bar-logo">
            <Link href="/" className="logo-text">
              Enanchored
            </Link>
            <div className="gap-footer"></div>
            <div className="footer-text">
            {"Enanchored Ltd, registered in the UK with Company House on 12 June 2024. Registration number: 15996523."} 
            </div>
            {/* <div className="gap-footer"></div>
            <button className="btn-two">know more</button> */}
          </div>
        </div>
        <div className="footer-section">
          <div className="nav-bar-menu">
            <Link href="/about-us" className="nav-bar-text">
              About us
            </Link>
            {/* <Link href="/blogs" className="nav-bar-text">
              Blog
            </Link> */}
            <Link href="/contact-us" className="nav-bar-text">
              Contact us
            </Link>
          </div>
          <div className="gap-footer"></div>
          <div className="nav-bar-text">Email : admin@enanchored.com </div>{" "}
          <div className="nav-bar-text">Phone : +44 77766 84128 </div>
          <div className="gap-footer"></div>
          {/* <div className="nav-bar-text"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
