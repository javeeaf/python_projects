import './subnav.css';

export function renderSubnav(element) {
  element.innerHTML = `
    <div class="subnav-main">
      <div class="subnav-left">
        <a href="#" class="subnav-item menu-all">
          <span class="material-icons menu-icon">menu</span>
          All
        </a>
        <a href="#" class="subnav-item">Amazon miniTV</a>
        <a href="#" class="subnav-item">Sell</a>
        <a href="#" class="subnav-item">Best Sellers</a>
        <a href="#" class="subnav-item">Mobiles</a>
        <a href="#" class="subnav-item">Today's Deals</a>
        <a href="#" class="subnav-item">Electronics</a>
        <a href="#" class="subnav-item">Customer Service</a>
        <a href="#" class="subnav-item subnav-hidden">Prime <span class="material-icons dropdown-icon">arrow_drop_down</span></a>
        <a href="#" class="subnav-item subnav-hidden">New Releases</a>
        <a href="#" class="subnav-item subnav-hidden">Home & Kitchen</a>
      </div>
      <div class="subnav-right">
        <a href="#" class="subnav-item prm-img">
          <!-- Placeholder for prime ad -->
          <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?h=39&w=400&fit=crop" alt="Prime Video Ad" height="39" />
        </a>
      </div>
    </div>
  `;
}
