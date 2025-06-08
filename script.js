const products = [
  {
    id: 1,
    name: "Fresh Chicken Breast",
    category: "chicken",
    price: "₹280/kg",
    description: "Boneless, skinless chicken breast - perfect for healthy meals",
    image: "Images/Chicken breast.jpeg",
    icon: "🐔",
    badge: "Popular"
  },
  {
    id: 2,
    name: "Chicken Legs",
    category: "chicken", 
    price: "₹200/kg",
    description: "Juicy chicken legs - great for BBQ and curry",
    image: "Images/Chicken_legs.png", 
    icon: "🍗",
    badge: "Fresh"
  },
  {
    id: 3,
    name: "Leg Boneless Chicken",
    category: "chicken",
    price: "₹180/kg",
    description: " Leg Boneless chicken - cleaned and ready to cook",
    image: "Images/Leg_Boneless.jpeg", 
    icon: "🐔",
    badge: "Best Value"
  },
  {
    id: 4,
    name: "Pork Shoulder",
    category: "pork",
    price: "₹350/kg",
    description: "Premium pork shoulder cuts - ideal for roasting",
    image: "pork-shoulder.jpg", 
    icon: "🥩",
    badge: "Premium"
  },
  {
    id: 5,
    name: "Pork Ribs",
    category: "pork",
    price: "₹400/kg",
    description: "Tender pork ribs - perfect for BBQ and smoking",
    image: "Images/Pork_rib.png", 
    icon: "🍖",
    badge: "BBQ Special"
  },
  {
    id: 6,
    name: "Pork Belly",
    category: "pork",
    price: "₹320/kg",
    description: "Juicy pork belly slices - great for stir-fry and curry",
    image: "pork-belly.jpg",
    icon: "🥓",
    badge: "Chef's Choice"
  },
  {
    id: 7,
    name: "Mutton Leg",
    category: "mutton",
    price: "₹550/kg",
    description: "Fresh mutton leg pieces - excellent for curry and biryani",
    image: "mutton-leg.jpg",
    icon: "🐑",
    badge: "Fresh"
  },
  {
    id: 8,
    name: "Mutton Chops",
    category: "mutton",
    price: "₹580/kg",
    description: "Premium mutton chops - perfect for special occasions",
    image: "mutton-chops.jpg",
    icon: "🥩",
    badge: "Premium"
  },
  {
    id: 9,
    name: "Goat Curry Cut",
    category: "mutton",
    price: "₹520/kg",
    description: "Tender goat meat curry cut - bone-in pieces",
    image: "goat-curry-cut.jpg",
    icon: "🐐",
    badge: "Traditional"
  }
];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const categoryButtons = document.querySelectorAll('.category');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
const splash = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');


// Render products
function renderProducts(filterCategory = 'all') {
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(product => product.category === filterCategory);
  
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image ${!product.image ? 'no-image' : ''}" id="img-${product.id}">
        ${product.image ? 
          `<img src="${product.image}" alt="${product.name}" onerror="handleImageError(${product.id}, '${product.icon}')" />` 
          : `<span class="fallback-icon">${product.icon}</span>`
        }
        <div class="product-badge">${product.badge}</div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">
          <span class="price">${product.price}</span>
          <button class="order-btn" onclick="orderProduct('${product.name}')">Order Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Handle image loading errors
function handleImageError(productId, fallbackIcon) {
  const imageContainer = document.getElementById(`img-${productId}`);
  if (imageContainer) {
    imageContainer.classList.add('no-image');
    imageContainer.innerHTML = `
      <span class="fallback-icon">${fallbackIcon}</span>
      <div class="product-badge">${imageContainer.querySelector('.product-badge').textContent}</div>
    `;
  }
}

// Category filtering
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.cat);
  });
});

// Order function
function orderProduct(productName) {
  const message = `Hi! I'd like to order ${productName}. Please let me know the availability and total price.`;
  const whatsappUrl = `https://wa.me/919056551682?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
});

// Smooth scrolling for navigation
function handleNavClick(e, link) {
  e.preventDefault();
  const targetId = link.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
      
// Update active nav link
document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
link.classList.add('active');
      
// Close mobile menu if open
if (mobileNav.classList.contains('active')) {
  mobileNav.classList.remove('active');
  mobileMenuBtn.textContent = '☰';
 }
}    

// Desktop navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => handleNavClick(e, link));
});

// Mobile navigation
mobileNavLinks.forEach(link => {
  link.addEventListener('click', (e) => handleNavClick(e, link));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-container') && mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
  }
});

// Splash screen
window.addEventListener('load', () => {
  setTimeout(() => {
    splash.style.opacity = '0';
    splash.style.pointerEvents = 'none';
    mainContent.style.display = 'block';
    setTimeout(() => {
      splash.style.display = 'none';
    }, 800);
  }, 2500);
});

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});

// Additional utility functions for future enhancements

// Add product to favorites (for future implementation)
function addToFavorites(productId) {
  console.log(`Product ${productId} added to favorites`);
  // Implementation can be added here
}

// Search functionality (for future implementation)
function searchProducts(searchTerm) {
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image ${!product.image ? 'no-image' : ''}" id="img-${product.id}">
        ${product.image ? 
          `<img src="${product.image}" alt="${product.name}" onerror="handleImageError(${product.id}, '${product.icon}')" />` 
          : `<span class="fallback-icon">${product.icon}</span>`
        }
        <div class="product-badge">${product.badge}</div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">
          <span class="price">${product.price}</span>
          <button class="order-btn" onclick="orderProduct('${product.name}')">Order Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Update product prices (for admin use)
function updateProductPrice(productId, newPrice) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.price = newPrice;
    renderProducts(); // Re-render to show updated price
    console.log(`Price updated for ${product.name}: ${newPrice}`);
  }
}
