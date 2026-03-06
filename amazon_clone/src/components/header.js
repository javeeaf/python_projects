import './header.css';

export function renderHeader(element) {
    element.innerHTML = `
    <div class="header-main">
      <div class="header-left">
        <a href="#" class="header-logo">
          <!-- Simple text logo mimicking Amazon -->
          <h2>amazon<span class="logo-in">.in</span></h2>
        </a>
        <div class="header-location">
          <span class="material-icons location-icon">location_on</span>
          <div class="location-text">
            <span class="location-line1">Delivering to Mumbai 400001</span>
            <span class="location-line2">Update location</span>
          </div>
        </div>
      </div>
      
      <div class="header-search">
        <select class="search-category">
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
        </select>
        <input type="text" class="search-input" placeholder="Search Amazon.in" />
        <button class="search-btn">
          <span class="material-icons">search</span>
        </button>
      </div>
      
      <div class="header-right">
        <div class="header-nav-item language-selector">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/20px-Flag_of_India.svg.png" alt="IN" class="flag-icon" />
          <span>EN</span>
          <span class="material-icons dropdown-icon">arrow_drop_down</span>
        </div>
        
        <div class="header-nav-item account-lists">
          <span class="nav-line1">Hello, sign in</span>
          <span class="nav-line2">Account & Lists <span class="material-icons dropdown-icon">arrow_drop_down</span></span>
        </div>
        
        <div class="header-nav-item returns-orders">
          <span class="nav-line1">Returns</span>
          <span class="nav-line2">& Orders</span>
        </div>
        
        <div class="header-nav-item cart-btn">
          <div class="cart-icon-wrapper">
            <span class="cart-count">0</span>
            <span class="material-icons">shopping_cart</span>
          </div>
          <span class="nav-line2 cart-text">Cart</span>
        </div>
      </div>
    </div>
  `;
}
