// Sidebar
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeBtn");

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Cart sidebar
const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const cartClose = document.getElementById("cartClose");

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
});

cartClose.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});


// Search functionality
const searchInput = document.getElementById("vendor-search");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll(".vendor-card");
    cards.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();
      card.style.display = name.includes(searchTerm) || description.includes(searchTerm) ? "block" : "none";
    });
  });
}



