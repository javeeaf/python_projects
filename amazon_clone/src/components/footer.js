import './footer.css';

export function renderFooter(element) {
    element.innerHTML = `
    <div class="footer-back-to-top" onclick="window.scrollTo(0,0)">
      Back to top
    </div>
    
    <div class="footer-main">
      <div class="footer-links-container">
        <div class="footer-col">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="#">Sell on Amazon</a></li>
            <li><a href="#">Sell under Amazon Accelerator</a></li>
            <li><a href="#">Protect and Build Your Brand</a></li>
            <li><a href="#">Amazon Global Selling</a></li>
            <li><a href="#">Become an Affiliate</a></li>
            <li><a href="#">Fulfilment by Amazon</a></li>
            <li><a href="#">Advertise Your Products</a></li>
            <li><a href="#">Amazon Pay on Merchants</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="#">COVID-19 and Amazon</a></li>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Returns Centre</a></li>
            <li><a href="#">100% Purchase Protection</a></li>
            <li><a href="#">Amazon App Download</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-line"></div>
    
    <div class="footer-region">
      <div class="footer-logo">
        <h2>amazon<span class="logo-in">.in</span></h2>
      </div>
      <div class="region-selectors">
        <a href="#" class="region-btn"><span class="material-icons info-icon">language</span> English</a>
      </div>
      <div class="countries">
        <ul>
          <li><a href="#">Australia</a></li>
          <li><a href="#">Brazil</a></li>
          <li><a href="#">Canada</a></li>
          <li><a href="#">China</a></li>
          <li><a href="#">France</a></li>
          <li><a href="#">Germany</a></li>
          <li><a href="#">Italy</a></li>
          <li><a href="#">Japan</a></li>
          <li><a href="#">Mexico</a></li>
          <li><a href="#">Netherlands</a></li>
          <li><a href="#">Poland</a></li>
          <li><a href="#">Singapore</a></li>
          <li><a href="#">Spain</a></li>
          <li><a href="#">Turkey</a></li>
          <li><a href="#">United Arab Emirates</a></li>
          <li><a href="#">United Kingdom</a></li>
          <li><a href="#">United States</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-copyright">
      <ul>
        <li><a href="#">Conditions of Use & Sale</a></li>
        <li><a href="#">Privacy Notice</a></li>
        <li><a href="#">Interest-Based Ads</a></li>
      </ul>
      <p>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
    </div>
  `;
}
