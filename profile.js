// ====== SIDEBAR TOGGLE ======
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

hamburgerBtn.addEventListener('click', () => {
  mobileSidebar.classList.add('active');
  overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  mobileSidebar.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  mobileSidebar.classList.remove('active');
  overlay.classList.remove('active');
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

// ====== SETTINGS MODALS ======
const settingButtons = document.querySelectorAll('.setting-btn');
const modals = document.querySelectorAll('.modal');

settingButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    document.getElementById(modalId).classList.add('active');
  });
});

modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      modal.classList.remove('active');
    }
  });
});
