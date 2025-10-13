import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = { /* same as before */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "auth.html";
    return;
  }
  const q = query(collection(db, "users", user.uid, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const list = document.getElementById("orders-list");

  if (snapshot.empty) {
    list.innerHTML = "<li>No orders yet.</li>";
    return;
  }

  snapshot.forEach((doc) => {
    const order = doc.data();
    const date = order.createdAt?.toDate().toLocaleString() || "N/A";
    const items = order.items.map(i => `${i.name} x${i.quantity}`).join(", ");
    list.innerHTML += `
      <li>
        <strong>${date}</strong><br>
        ${items}<br>
        Total: ₦${order.total.toLocaleString()}<br>
        Status: ${order.status}
      </li>`;
  });
});
