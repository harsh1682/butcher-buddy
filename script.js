// Splash screen hide after delay
    window.addEventListener("load", function () {
      const splash = document.getElementById("splash-screen");
      const content = document.getElementById("main-content");

      setTimeout(() => {
        splash.style.opacity = 0;
        splash.style.pointerEvents = "none";
        content.style.display = "block";
      }, 2500);
    });

const products = [
  {
    id: 1,
    name: "Leg Boneless Curry Cut",
    description: "Bone-in, skinless chunks",
    price: 149,
    weight: "500g",
    category: "chicken",
    image: "Leg_Boneless.jpeg"
  },
  {
    id: 2,
    name: "Chicken Breast Boneless",
    description: "Tender, juicy",
    price: 179,
    weight: "500g",
    category: "chicken",
    image: "Chicken_breast.jpg"
  },
  {
    id: 3,
    name: "Pork Ribs",
    description: "Perfect for BBQ & grilling",
    price: 249,
    weight: "500g",
    category: "pork",
    image: "Pork_ribs.jpeg"
  },
  {
    id: 4,
    name: "Pork Mince",
    description: "Great for keema & patties",
    price: 189,
    weight: "500g",
    category: "pork",
    image: "Pork_keema.jpeg"
  },
  {
    id: 5,
    name: "Chicken Salami",
    description: "Ready to cook",
    price: 199,
    weight: "400g",
    category: "Chicken",
    image: "Salami.jpeg"
  },
  {
    id: 6,
    name: "Chicken Mince",
    description: "Great for keema & patties",
    price: 189,
    weight: "500g",
    category: "Chicken",
    image: "Chicken_Keema.jpeg"
  },
  {
    id: 7,
    name: "Chicken Seekh",
    description: "Ready to cook",
    price: 189,
    weight: "500g",
    category: "Chicken",
    image: "Chicken_Sekh.jpeg"
  },
  {
    id: 8,
    name: "Chicken leg",
    description: "Ready to cook and barbeque",
    price: 189,
    weight: "500g",
    category: "Chicken",
    image: "Chicken_legs.jpeg"
  },
  {
    id: 9,
    name: "Chicken feet",
    description: "Ready to cook",
    price: 189,
    weight: "500g",
    category: "Chicken",
    image: "Chicken_feet.jpeg"
  },
];

const productsContainer = document.querySelector(".products");
const categoryButtons = document.querySelectorAll(".category");

function renderProducts(filter = "all") {
  productsContainer.innerHTML = "";
  const filteredProducts = filter === "all" ? products : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy"/>
      <h3>${product.name}</h3>
      <p class="desc">${product.description}</p>
      <p class="weight">${product.weight}</p>
      <p class="price">₹${product.price}</p>
      <a href="https://wa.me/919056551682?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}" target="_blank" class="btn-primary" aria-label="Order ${product.name} on WhatsApp">Order Now</a>
    `;
    productsContainer.appendChild(card);
  });
}

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.getAttribute("data-cat"));
  });
});

renderProducts();
