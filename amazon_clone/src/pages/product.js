import './product.css';

export function renderProduct(element) {
  element.innerHTML = `
    <div class="product-main">
      <div class="product-gallery">
        <div class="thumbnails">
          <img src="https://m.media-amazon.com/images/I/81fxjeu8fdL._SX522_.jpg" alt="Thumb">
          <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80" alt="Thumb">
          <img src="https://m.media-amazon.com/images/I/71v2jVh6nIL._SX522_.jpg" alt="Thumb">
        </div>
        <div class="main-image">
          <img src="https://m.media-amazon.com/images/I/81fxjeu8fdL._SX522_.jpg" alt="Main Product">
        </div>
      </div>
      
      <div class="product-info">
        <h1 class="product-title">Apple iPhone 15 (128 GB) - Blue</h1>
        <a href="#" class="brand-link">Visit the Apple Store</a>
        
        <div class="rating-strip">
          <span class="product-rating">4.5 <span class="material-icons stars">star star star star star_half</span></span>
          <a href="#">14,245 ratings</a> | <a href="#">1000+ answered questions</a>
        </div>
        
        <hr class="divider">
        
        <div class="price-block">
          <div class="price-row">
            <span class="discount-badge">-13%</span>
            <span class="price-large"><span class="currency">₹</span>69,900</span>
          </div>
          <div class="mrp-row">
            M.R.P.: <span class="mrp-strikethrough">₹79,900</span>
          </div>
          <p class="tax-info">Inclusive of all taxes</p>
          <p class="emi-info"><strong>EMI</strong> starts at ₹3,389. No Cost EMI available</p>
        </div>
        
        <hr class="divider">
        
        <div class="product-details-list">
          <div class="detail-row"><span>Brand</span><span>Apple</span></div>
          <div class="detail-row"><span>Operating System</span><span>iOS</span></div>
          <div class="detail-row"><span>Memory Storage Capacity</span><span>128 GB</span></div>
          <div class="detail-row"><span>Screen Size</span><span>6.1 Inches</span></div>
          <div class="detail-row"><span>Resolution</span><span>460 ppi</span></div>
        </div>
        
        <hr class="divider">
        
        <div class="about-item">
          <h3>About this item</h3>
          <ul>
            <li>DYNAMIC ISLAND COMES TO IPHONE 15 — Dynamic Island bubbles up alerts and Live Activities — so you don’t miss them while you’re doing something else. You can see who’s calling, track your next ride, check your flight status, and so much more.</li>
            <li>INNOVATIVE DESIGN — iPhone 15 features a durable color-infused glass and aluminum design. It’s splash, water, and dust resistant. The Ceramic Shield front is tougher than any smartphone glass. And the 6.1" Super Retina XDR display is up to 2x brighter in the sun compared to iPhone 14.</li>
            <li>48MP MAIN CAMERA WITH 2X TELEPHOTO — The 48MP Main camera shoots in super-high resolution. So it’s easier than ever to take standout photos with amazing detail. The 2x optical-quality Telephoto lets you frame the perfect close-up.</li>
          </ul>
        </div>
      </div>
      
      <div class="product-buybox">
        <div class="buybox-price">
          <span class="price-large"><span class="currency">₹</span>69,900</span>
        </div>
        
        <div class="buybox-delivery">
          <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" alt="Prime">
          <p>FREE delivery <strong>Tomorrow</strong>. Order within 10 hrs 30 mins.</p>
        </div>
        
        <div class="buybox-location">
          <span class="material-icons location-icon">location_on</span> <a href="#">Deliver to Mumbai 400001</a>
        </div>
        
        <h3 class="stock-status">In stock</h3>
        
        <div class="quantity-selector">
          <label>Quantity:</label>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        
        <button class="btn btn-add-cart">Add to Cart</button>
        <button class="btn btn-buy-now">Buy Now</button>
        
        <div class="secure-txn">
          <span class="material-icons lock-icon">lock</span>
          <a href="#">Secure transaction</a>
        </div>
        
        <div class="dispatch-details">
          <div class="dd-row"><span>Ships from</span><span>Amazon</span></div>
          <div class="dd-row"><span>Sold by</span><span>Appario Retail Private Ltd</span></div>
        </div>
        
      </div>
    </div>
  `;
}
