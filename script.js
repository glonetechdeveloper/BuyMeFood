// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Parallax background movement
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  let offset = window.scrollY * 0.5;
  hero.style.backgroundPositionY = offset + "px";
});

// Typewriter-style reveal for "Hello Foodie"
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.hero-title');
  const text = title.textContent;
  title.textContent = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = 0;
    span.style.transition = `opacity 0.05s ease ${i * 70}ms`;
    title.appendChild(span);
    setTimeout(() => (span.style.opacity = 1), i * 70);
  });
});



// Scroll fade-in effect for sections
const fadeSections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.3 }
);

fadeSections.forEach((section) => observer.observe(section));








//news and updates

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".carousel-control.next");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const dotsNav = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  let slideInterval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if(i === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);
  });
  const dots = Array.from(dotsNav.children);

  function updateCarousel(index) {
    track.style.transform = `translateX(-${100 * index}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
  }

  function nextSlide() {
    let index = (currentIndex + 1) % slides.length;
    updateCarousel(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(index);
  }

  // Button listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Dot listeners
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => updateCarousel(i));
  });

  // Auto slide
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Pause on hover
  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();
});

