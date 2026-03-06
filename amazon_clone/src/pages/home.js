import './home.css';

export function renderHome(element) {
  element.innerHTML = `
    <div class="home-main">
      <div class="hero-carousel">
        <ul class="carousel-track">
          <li class="carousel-slide current-slide">
            <img class="carousel-image" src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg" alt="Hero 1">
          </li>
          <li class="carousel-slide">
            <img class="carousel-image" src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg" alt="Hero 2">
          </li>
          <li class="carousel-slide">
            <img class="carousel-image" src="https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg" alt="Hero 3">
          </li>
        </ul>
        <button class="carousel-button carousel-button--left">
          <span class="material-icons">chevron_left</span>
        </button>
        <button class="carousel-button carousel-button--right">
          <span class="material-icons">chevron_right</span>
        </button>
        <div class="hero-gradient-overlay"></div>
      </div>
      
      <div class="home-rows">
        <div class="home-row">
          <div class="category-card">
            <h3>Revamp your home in style</h3>
            <div class="card-grid">
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=80" alt="Beds">
                <span>Beds</span>
              </div>
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" alt="Furniture">
                <span>Furniture</span>
              </div>
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&q=80" alt="Home Decor">
                <span>Home Decor</span>
              </div>
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1600166898405-da9535204843?w=300&q=80" alt="Rugs">
                <span>Rugs</span>
              </div>
            </div>
            <a href="#" class="card-link">Explore all</a>
          </div>
          
          <div class="category-card">
            <h3>Automotive essentials | Up to 60% off</h3>
            <div class="card-grid">
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1585882583842-8759fb9de564?w=300&q=80" alt="Cleaning">
                <span>Cleaning</span>
              </div>
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1580274455171-125dd2808c1d?w=300&q=80" alt="Tyre & rim care">
                <span>Tyre & rim care</span>
              </div>
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1557008129-bc84fdb7ee2e?w=300&q=80" alt="Helmets">
                <span>Helmets</span>
              </div>
              <div class="card-item">
                <img src="https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&q=80" alt="Vacuum cleaner">
                <span>Vacuum cleaner</span>
              </div>
            </div>
            <a href="#" class="card-link">See more</a>
          </div>
          
          <div class="category-card card-single">
            <h3>Up to 75% off | Electronics & accessories</h3>
            <img class="single-img" src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80" alt="Electronics">
            <a href="#" class="card-link">See all offers</a>
          </div>
          
          <div class="category-card sign-in-card">
            <div class="sign-in-box">
              <h3>Sign in for your best experience</h3>
              <button class="sign-in-btn">Sign in securely</button>
            </div>
            <div class="ad-img-container">
               <img class="ad-img" src="https://m.media-amazon.com/images/G/31/img19/AMS/Houseads/Laptops-Sept2019._CB436595915_.jpg" alt="Advertisement">
            </div>
          </div>
        </div>
        
        <!-- Second Row of Cards -->
        <div class="home-row">
            <div class="category-card card-single">
                <h3>Up to 60% off | Styles for Men</h3>
                <img class="single-img" src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80" alt="Men Fashion">
                <a href="#" class="card-link">End of season sale</a>
            </div>
            <div class="category-card card-single">
                <h3>Up to 50% off | Laptops & Tablets</h3>
                <img class="single-img" src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80" alt="Laptops">
                <a href="#" class="card-link">Shop now</a>
            </div>
            <div class="category-card card-single">
                <h3>Up to 40% off | Mobiles & accessories</h3>
                <img class="single-img" src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Mobiles">
                <a href="#" class="card-link">See all offers</a>
            </div>
            <div class="category-card card-single">
                <h3>Starting ₹99 | Amazon Brands</h3>
                <img class="single-img" src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80" alt="Brands">
                <a href="#" class="card-link">Shop now</a>
            </div>
        </div>
      </div>
    </div>
  `;

  // Basic carousel logic
  const track = element.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = element.querySelector('.carousel-button--right');
  const prevButton = element.querySelector('.carousel-button--left');

  // Need to wait slightly for css to load to get accurate bounding rect, or just shift by 100%
  let currentSlideIndex = 0;

  const updateSlidePosition = () => {
    track.style.transform = 'translateX(-' + currentSlideIndex * 100 + '%)';
  };

  nextButton.addEventListener('click', e => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlidePosition();
  });

  prevButton.addEventListener('click', e => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  });

  // Auto advance
  let autoAdvance = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlidePosition();
  }, 5000);

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoAdvance));
  track.addEventListener('mouseleave', () => {
    autoAdvance = setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateSlidePosition();
    }, 5000);
  });
}
