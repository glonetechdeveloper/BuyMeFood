// // ===========================
// // Firebase Setup
// // ===========================
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import {
//   getAuth,
//   onAuthStateChanged,
//   signOut
// } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   addDoc,
//   collection,
//   serverTimestamp
// } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// // 🔥 Your config
// const firebaseConfig = {
//   apiKey: "AIzaSyBUeM4bzg6b_9GCSBPLUbCDRQgN47QFwsw",
//   authDomain: "buy-me-food-a2223.firebaseapp.com",
//   projectId: "buy-me-food-a2223",
//   appId: "1:602697360069:web:640a6f142f342bf60ac6ac"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // ===========================
// // Auth State Listener
// // ===========================
// let currentUser = null;
// let cart = [];

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     currentUser = user;
//     console.log("User logged in:", user.email);
//     await loadCart(user.uid);
//   } else {
//     // Redirect if not logged in
//     if (!window.location.href.includes("login") && !window.location.href.includes("index")) {
//       window.location.href = "login.html";
//     }
//   }
// });

// // ===========================
// // CART FUNCTIONS
// // ===========================

// // Load user's cart from Firestore
// async function loadCart(uid) {
//   try {
//     const cartRef = doc(db, "carts", uid);
//     const snap = await getDoc(cartRef);
//     if (snap.exists()) {
//       cart = snap.data().items || [];
//       updateCartUI();
//     }
//   } catch (err) {
//     console.error("Error loading cart:", err);
//   }
// }

// // Save user's cart to Firestore
// async function saveCart(uid) {
//   const cartRef = doc(db, "carts", uid);
//   await setDoc(cartRef, {
//     items: cart,
//     updatedAt: serverTimestamp()
//   });
// }

// // Add item to cart
// window.addToCart = (name, price) => {
//   const existing = cart.find(item => item.name === name);
//   if (existing) existing.quantity++;
//   else cart.push({ name, price, quantity: 1 });

//   updateCartUI();
//   if (currentUser) saveCart(currentUser.uid);
// };

// // Change quantity
// window.changeQuantity = (index, amount) => {
//   cart[index].quantity += amount;
//   if (cart[index].quantity <= 0) cart.splice(index, 1);
//   updateCartUI();
//   if (currentUser) saveCart(currentUser.uid);
// };

// // Remove from cart
// window.removeFromCart = (index) => {
//   cart.splice(index, 1);
//   updateCartUI();
//   if (currentUser) saveCart(currentUser.uid);
// };

// // Update cart display
// function updateCartUI() {
//   const cartItems = document.getElementById("cart-items");
//   const cartTotal = document.getElementById("cart-total");
//   const cartCount = document.querySelector(".cart-count");

//   if (!cartItems || !cartTotal) return;

//   cartItems.innerHTML = "";
//   let total = 0;
//   let count = 0;

//   cart.forEach((item, i) => {
//     total += item.price * item.quantity;
//     count += item.quantity;

//     const li = document.createElement("li");
//     li.innerHTML = `
//       ${item.name} - ₦${(item.price * item.quantity).toLocaleString()}
//       <span class="cart-controls">
//         <button onclick="changeQuantity(${i}, -1)">−</button>
//         ${item.quantity}
//         <button onclick="changeQuantity(${i}, 1)">+</button>
//       </span>
//       <button onclick="removeFromCart(${i})">✕</button>
//     `;
//     cartItems.appendChild(li);
//   });

//   cartTotal.textContent = `Total: ₦${total.toLocaleString()}`;
//   if (cartCount) cartCount.textContent = count;
// }

// // ===========================
// // CHECKOUT
// // ===========================
// window.checkout = async () => {
//   if (!currentUser) return alert("Please sign in to checkout.");
//   if (cart.length === 0) return alert("Your cart is empty!");

//   const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//   const ordersRef = collection(db, "users", currentUser.uid, "orders");

//   await addDoc(ordersRef, {
//     items: cart,
//     total,
//     status: "pending",
//     createdAt: serverTimestamp()
//   });

//   // Clear cart
//   cart = [];
//   updateCartUI();
//   await saveCart(currentUser.uid);

//   alert("✅ Order placed successfully!");
// };

// // ===========================
// // LOGOUT
// // ===========================
// window.logout = async () => {
//   await signOut(auth);
//   alert("Logged out successfully!");
//   window.location.href = "login.html";
// };


// ===========================
// Firebase Setup
// ===========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBUeM4bzg6b_9GCSBPLUbCDRQgN47QFwsw",
  authDomain: "buy-me-food-a2223.firebaseapp.com",
  projectId: "buy-me-food-a2223",
  appId: "1:602697360069:web:640a6f142f342bf60ac6ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===========================
// Auth State + Global Vars
// ===========================
let currentUser = null;
let cart = [];

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    console.log("✅ Logged in as:", user.email);
    await loadCart(user.uid);
  } else {
    // redirect if needed
    const path = window.location.pathname;
    if (!path.includes("login") && !path.includes("index")) {
      window.location.href = "auth.html";
    }
  }
});

// ===========================
// CART FUNCTIONS (Firestore Synced)
// ===========================

// Load user's cart from Firestore
async function loadCart(uid) {
  try {
    const cartRef = doc(db, "carts", uid);
    const snap = await getDoc(cartRef);
    if (snap.exists()) {
      cart = snap.data().items || [];
      updateCartUI();
    } else {
      cart = [];
    }
  } catch (err) {
    console.error("❌ Error loading cart:", err);
  }
}

// Save user's cart to Firestore
async function saveCart(uid) {
  try {
    const cartRef = doc(db, "carts", uid);
    await setDoc(cartRef, {
      items: cart,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.error("❌ Error saving cart:", err);
  }
}

// Add item to cart
window.addToCart = (name, price) => {
  const existing = cart.find(item => item.name === name);
  if (existing) existing.quantity++;
  else cart.push({ name, price, quantity: 1 });

  updateCartUI();
  if (currentUser) saveCart(currentUser.uid);
};

// Change quantity
window.changeQuantity = (index, amount) => {
  cart[index].quantity += amount;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCartUI();
  if (currentUser) saveCart(currentUser.uid);
};

// Remove item
window.removeFromCart = (index) => {
  cart.splice(index, 1);
  updateCartUI();
  if (currentUser) saveCart(currentUser.uid);
};

// ===========================
// UI CART RENDER
// ===========================





// function updateCartUI() {
//   const cartItems = document.getElementById("cart-items");
//   const cartTotal = document.getElementById("cart-total");
//   const cartCount = document.querySelector(".cart-count");

//     // 🆕 Overlay elements
//   const overlaySidebar = document.getElementById("cartSidebar");
//   const overlayList = overlaySidebar?.querySelector("ul");
//   const overlayTotal = overlaySidebar?.querySelector(".cart-overlay-total");
//   const overlayEmpty = overlaySidebar?.querySelector("p");


//   if (!cartItems || !cartTotal) return;

//     if (cartItems) cartItems.innerHTML = "";
//   if (overlayList) overlayList.innerHTML = "";

//   let total = 0;
//   let count = 0;

//   if (cart.length === 0) {
//     if (overlayEmpty) overlayEmpty.textContent = "No items yet.";
//   } else if (overlayEmpty) {
//     overlayEmpty.textContent = "";
//   }

//   cart.forEach((item, i) => {
//     total += item.price * item.quantity;
//     count += item.quantity;

//      // Vendor aside

//     if (cartItems) {
//       const li = document.createElement("li");
//       li.innerHTML = `
//         ${item.name} - ₦${(item.price * item.quantity).toLocaleString()}
//         <span class="cart-controls">
//           <button onclick="changeQuantity(${i}, -1)">−</button>
//           ${item.quantity}
//           <button onclick="changeQuantity(${i}, 1)">+</button>
//         </span>
//         <button onclick="removeFromCart(${i})">✕</button>
//       `;
//       cartItems.appendChild(li);
//     }

//     // 🆕 Overlay list
//     if (overlayList) {
//       const li = document.createElement("li");
//       li.innerHTML = `
//         ${item.name} × ${item.quantity}
//         <span>₦${(item.price * item.quantity).toLocaleString()}</span>
//       `;
//       overlayList.appendChild(li);
//     }
//   });

//   if (cartTotal) cartTotal.textContent = `Total: ₦${total.toLocaleString()}`;
//   if (overlayTotal) overlayTotal.textContent = `Total: ₦${total.toLocaleString()}`;
//   if (cartCount) cartCount.textContent = count;
// }

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.querySelector(".cart-count");

  // Overlay elements
  const overlaySidebar = document.getElementById("cartSidebar");
  const overlayList = overlaySidebar?.querySelector("ul");
  const overlayTotal = overlaySidebar?.querySelector(".cart-overlay-total");
  const overlayEmpty = overlaySidebar?.querySelector("p");

  // Reset
  if (cartItems) cartItems.innerHTML = "";
  if (overlayList) overlayList.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    // ✅ If cart is empty
    if (overlayEmpty) {
      overlayEmpty.textContent = "No items yet.";
      overlayEmpty.style.display = "block";
    }
  } else {
    // ✅ Hide empty message when items exist
    if (overlayEmpty) overlayEmpty.style.display = "none";

    cart.forEach((item, i) => {
      total += item.price * item.quantity;
      count += item.quantity;

      // Vendor aside (if on vendor page)
      if (cartItems) {
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.name} - ₦${(item.price * item.quantity).toLocaleString()}
          <span class="cart-controls">
            <button onclick="changeQuantity(${i}, -1)">−</button>
            ${item.quantity}
            <button onclick="changeQuantity(${i}, 1)">+</button>
          </span>
          <button onclick="removeFromCart(${i})">✕</button>
        `;
        cartItems.appendChild(li);
      }

      // Overlay sidebar
      if (overlayList) {
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.name} × ${item.quantity}
          <span>₦${(item.price * item.quantity).toLocaleString()}</span>
        `;
        overlayList.appendChild(li);
      }
    });
  }

  // Totals and count
  if (cartTotal) cartTotal.textContent = `Total: ₦${total.toLocaleString()}`;
  if (overlayTotal) overlayTotal.textContent = `Total: ₦${total.toLocaleString()}`;
  if (cartCount) cartCount.textContent = count;
}

// === CART OVERLAY TOGGLE ===
const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.getElementById("cartIcon");
const cartClose = document.getElementById("cartClose");

cartIcon?.addEventListener("click", () => {
  updateCartUI(); // Always refresh when opened
  cartSidebar.classList.add("active");
});

cartClose?.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});








// ===========================
// CHECKOUT
// ===========================



// window.checkout = async () => {
//   if (!currentUser) return alert("Please sign in to checkout.");
//   if (cart.length === 0) return alert("Your cart is empty!");

//   const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//   const ordersRef = collection(db, "users", currentUser.uid, "orders");

//   await addDoc(ordersRef, {
//     items: cart,
//     total,
//     status: "pending",
//     createdAt: serverTimestamp()
//   });

//   // Clear cart
//   cart = [];
//   updateCartUI();
//   await saveCart(currentUser.uid);

//   alert("✅ Order placed successfully!");
// };



window.checkout = async () => {
  if (!currentUser) return alert("Please sign in to checkout.");
  if (cart.length === 0) return alert("Your cart is empty!");

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const orderData = {
    userId: currentUser.uid,
    userEmail: currentUser.email || "unknown",
    items: cart,
    total,
    status: "pending",
    createdAt: serverTimestamp()
  };

  try {
    // 1️⃣ Save order under the user's collection
    const userOrdersRef = collection(db, "users", currentUser.uid, "orders");
    await addDoc(userOrdersRef, orderData);

    // 2️⃣ Save same order to global collection (admin analytics)
    const globalOrdersRef = collection(db, "orders");
    await addDoc(globalOrdersRef, orderData);

    // 3️⃣ Clear cart after successful order
    cart = [];
    updateCartUI();
    await saveCart(currentUser.uid);

    alert("✅ Order placed successfully!");
  } catch (err) {
    console.error("Checkout failed:", err);
    alert("⚠️ Something went wrong while placing your order.");
  }
};


window.clearCart = async () => {
  if (cart.length === 0) return alert("Cart is already empty!");

  if (!confirm("Are you sure you want to clear your cart?")) return;

  cart = [];
  updateCartUI();

  if (currentUser) {
    await saveCart(currentUser.uid);
  }

  alert("🧹 Cart cleared successfully!");
};




// ===========================
// LOGOUT
// ===========================
window.logout = async () => {
  try {
    await signOut(auth);
    alert("✅ Logged out successfully!");
    window.location.href = "auth.html"; // redirect to login page
  } catch (err) {
    console.error("Logout failed:", err);
    alert("⚠️ Error logging out. Please try again.");
  }
};

// ===========================
// LOGOUT MODAL BUTTON LINK
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const logoutConfirmBtn = document.getElementById("logoutConfirmBtn");
  if (logoutConfirmBtn) {
    logoutConfirmBtn.addEventListener("click", () => {
      window.logout(); // call the logout function above
      const logoutModal = document.getElementById("logout");
      if (logoutModal) logoutModal.classList.remove("active"); // close modal if open
    });
  }
});