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

// Typewriter animation
const typewriter = document.querySelector(".typewriter");
const words = ["Hello Foodie!", "Welcome to Buy Me Food", "Hungry? We've got you!"];
let i = 0, j = 0, isDeleting = false;

function typing() {
  const current = words[i];
  if (isDeleting) {
    typewriter.textContent = current.substring(0, j--);
  } else {
    typewriter.textContent = current.substring(0, j++);
  }

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(typing, 1500);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(typing, 400);
  } else {
    setTimeout(typing, isDeleting ? 60 : 100);
  }
}
typing();




