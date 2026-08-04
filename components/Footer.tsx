export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="colophon-label">COLOPHON</div>
        <div className="footer-grid">
          <div className="brand">
            <div className="logo">
              Any<span className="dot">Book</span>
            </div>
            <p>AnyBook reads the whole book. You get every angle.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="#how">How it works</a></li>
              <li><a href="#what">What you get</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AnyBook. All rights reserved.</span>
          <span>For readers who search first.</span>
        </div>
      </div>
    </footer>
  );
}
