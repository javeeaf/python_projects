import './search.css';

const dummyProducts = [
  {
    id: 1,
    title: 'Apple iPhone 15 (128 GB) - Blue',
    image: 'https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_UY327_FMwebp_QL65_.jpg',
    rating: '4.5',
    ratingCount: '14,245',
    price: '69,900',
    mrp: '79,900',
    discount: '(13% off)',
    category: 'smartphone apple iphone mobile'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
    rating: '4.6',
    ratingCount: '8,530',
    price: '1,24,999',
    mrp: '1,49,999',
    discount: '(17% off)',
    category: 'smartphone samsung mobile android'
  },
  {
    id: 3,
    title: 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
    rating: '4.8',
    ratingCount: '5,120',
    price: '29,990',
    mrp: '34,990',
    discount: '(14% off)',
    category: 'electronics headphones audio sony'
  },
  {
    id: 4,
    title: 'Apple MacBook Air Laptop M1 chip, 13.3-inch Retina Display',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: '4.7',
    ratingCount: '12,450',
    price: '79,900',
    mrp: '99,900',
    discount: '(20% off)',
    category: 'laptop macbook apple computer'
  },
  {
    id: 5,
    title: 'LG 139 cm (55 inches) 4K Ultra HD Smart LED TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    rating: '4.3',
    ratingCount: '9,800',
    price: '43,990',
    mrp: '79,990',
    discount: '(45% off)',
    category: 'tv television lg electronics'
  }
];

export function renderSearch(element, query = '') {
  let filteredProducts = dummyProducts;

  if (query) {
    const q = query.toLowerCase();
    filteredProducts = dummyProducts.filter(p =>
      p.title.toLowerCase().includes(q) || p.category.includes(q)
    );
  }

  let resultsHTML = '';

  if (filteredProducts.length === 0) {
    resultsHTML = `
      <div style="padding: 20px;">
        <p style="font-size: 16px; margin-bottom: 10px;">No results for <b>"${query}"</b>.</p>
        <p>Try checking your spelling or use more general terms</p>
      </div>
    `;
  } else {
    resultsHTML = filteredProducts.map(p => `
        <div class="result-item" onclick="window.location.hash='#product'">
          <div class="result-img">
            <img src="${p.image}" alt="Product Image">
          </div>
          <div class="result-details">
            <h3 class="result-title">${p.title}</h3>
            <div class="result-rating">
              <span class="material-icons stars">star star star star star_half</span>
              <span class="rating-count">${p.ratingCount}</span>
            </div>
            <div class="result-price">
              <span class="currency">₹</span><span class="amount">${p.price}</span>
              <span class="mrp">M.R.P: ₹${p.mrp}</span>
              <span class="discount">${p.discount}</span>
            </div>
            <div class="result-delivery">
              <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" alt="Prime">
              <p>FREE delivery <strong>Tomorrow</strong></p>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
    `).join('');
  }

  element.innerHTML = `
    <div class="search-main">
      <div class="search-sidebar">
        <div class="sidebar-section">
          <h4>Delivery Day</h4>
          <label><input type="checkbox"> Get It by Tomorrow</label>
        </div>
        
        <div class="sidebar-section">
          <h4>Category</h4>
          <ul class="sidebar-list">
            <li><a href="#">Smartphones & Basic Mobiles</a></li>
            <li><a href="#">Electronics</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h4>Brand</h4>
          <label><input type="checkbox"> Samsung</label>
          <label><input type="checkbox"> Apple</label>
          <label><input type="checkbox"> OnePlus</label>
          <label><input type="checkbox"> Xiaomi</label>
        </div>
        
        <div class="sidebar-section">
          <h4>Price</h4>
          <ul class="sidebar-list">
            <li><a href="#">Under ₹1,000</a></li>
            <li><a href="#">₹1,000 - ₹5,000</a></li>
            <li><a href="#">₹5,000 - ₹10,000</a></li>
            <li><a href="#">₹10,000 - ₹20,000</a></li>
            <li><a href="#">Over ₹20,000</a></li>
          </ul>
        </div>
      </div>
      
      <div class="search-results">
        <h2 class="search-heading">Results ${query ? 'for "' + query + '"' : ''}</h2>
        ${resultsHTML}
      </div>
    </div>
  `;
}
