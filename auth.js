// /* ===========================
//    Firebase Setup
//    =========================== */
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// // 🔥 Replace this with YOUR Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyBUeM4bzg6b_9GCSBPLUbCDRQgN47QFwsw",
//   authDomain: "buy-me-food-a2223.firebaseapp.com",
//   projectId: "buy-me-food-a2223",
//   appId: "1:602697360069:web:640a6f142f342bf60ac6ac"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// /* ===========================
//    Desktop Overlay Animation
//    =========================== */
// const signUpButton = document.getElementById("signUp");
// const signInButton = document.getElementById("signIn");
// const container = document.getElementById("container");

// signUpButton?.addEventListener("click", () => container.classList.add("right-panel-active"));
// signInButton?.addEventListener("click", () => container.classList.remove("right-panel-active"));

// /* ===========================
//    Mobile Form Logic
//    =========================== */
// const mobileSignInBtn = document.getElementById("mobileSignIn");
// const mobileSignUpBtn = document.getElementById("mobileSignUp");

// function isMobile() {
//   return window.innerWidth <= 768;
// }

// function setupProgressiveReveal(form) {
//   if (!form) return;
//   const inputs = form.querySelectorAll("input");
//   inputs.forEach((inp, i) => {
//     inp.classList.remove("visible");
//     inp.addEventListener("input", () => {
//       if (inp.value.trim() && inputs[i + 1]) {
//         inputs[i + 1].classList.add("visible");
//       }
//     });
//   });
//   if (inputs[0]) inputs[0].classList.add("visible");
// }

// function showMobileForm(which) {
//   const signInContainer = document.querySelector(".sign-in-container");
//   const signUpContainer = document.querySelector(".sign-up-container");

//   if (which === "signin") {
//     signInContainer.classList.add("active");
//     signUpContainer.classList.remove("active");
//     mobileSignInBtn.classList.add("active");
//     mobileSignUpBtn.classList.remove("active");
//     setupProgressiveReveal(document.getElementById("signInForm"));
//   } else {
//     signUpContainer.classList.add("active");
//     signInContainer.classList.remove("active");
//     mobileSignUpBtn.classList.add("active");
//     mobileSignInBtn.classList.remove("active");
//     setupProgressiveReveal(document.getElementById("signUpForm"));
//   }
// }

// mobileSignInBtn?.addEventListener("click", () => showMobileForm("signin"));
// mobileSignUpBtn?.addEventListener("click", () => showMobileForm("signup"));

// window.addEventListener("resize", () => {
//   if (isMobile()) {
//     if (mobileToggle) {
//       mobileToggle.style.display = "flex";
//       mobileToggle.style.opacity = "1";
//     }
//     showMobileForm("signin");
//   } else {
//     if (mobileToggle) {
//       mobileToggle.style.display = "none";
//       mobileToggle.style.opacity = "0";
//     }
//     document.querySelectorAll(".sign-in-container, .sign-up-container")
//       .forEach(el => el.classList.remove("active"));
//   }
// });


// /* ===========================
//    Firebase Auth Functions
//    =========================== */

// // Email/password sign-up
// document.getElementById("signUpForm")?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = document.getElementById("signupEmail").value;
//   const password = document.getElementById("signupPassword").value;

//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     alert("Account created successfully!");
//     window.location.href = "home.html";
//   } catch (err) {
//     alert(err.message);
//   }
// });

// // Email/password sign-in
// document.getElementById("signInForm")?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = document.getElementById("signinEmail").value;
//   const password = document.getElementById("signinPassword").value;

//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//     window.location.href = "home.html";
//   } catch (err) {
//     alert(err.message);
//   }
// });

// // Google sign-in / sign-up
// document.getElementById("googleSignIn")?.addEventListener("click", async () => {
//   try {
//     await signInWithPopup(auth, provider);
//     alert("Signed in with Google!");
//     window.location.href = "home.html";
//   } catch (err) {
//     alert(err.message);
//   }
// });

// document.getElementById("googleSignUp")?.addEventListener("click", async () => {
//   try {
//     await signInWithPopup(auth, provider);
//     alert("Signed up with Google!");
//     window.location.href = "home.html";
//   } catch (err) {
//     alert(err.message);
//   }
// });


/* ===========================
   Firebase Setup
   =========================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc, 
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBUeM4bzg6b_9GCSBPLUbCDRQgN47QFwsw",
  authDomain: "buy-me-food-a2223.firebaseapp.com",
  projectId: "buy-me-food-a2223",
  appId: "1:602697360069:web:640a6f142f342bf60ac6ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

/* ===========================
   SIGN UP WITH EMAIL/PASSWORD
   =========================== */
document.getElementById("signUpForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create Firestore document for this user
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
      role: "customer"
    });

    alert("Account created successfully!");
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }

  // After successful signup/signin
await setDoc(doc(db, "users", auth.currentUser.uid), {
  email: auth.currentUser.email,
  createdAt: serverTimestamp(),
}, { merge: true });

});

/* ===========================
   SIGN IN WITH EMAIL/PASSWORD
   =========================== */
document.getElementById("signInForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }

  // After successful signup/signin
await setDoc(doc(db, "users", auth.currentUser.uid), {
  email: auth.currentUser.email,
  createdAt: serverTimestamp(),
}, { merge: true });

});

/* ===========================
   GOOGLE SIGN-IN / SIGN-UP
   =========================== */
async function handleGoogleAuth() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // If user doesn't exist yet, create profile
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName || "",
        createdAt: new Date().toISOString(),
        role: "customer"
      });
    }

    alert("Signed in successfully!");
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }

  // After successful signup/signin
await setDoc(doc(db, "users", auth.currentUser.uid), {
  email: auth.currentUser.email,
  createdAt: serverTimestamp(),
}, { merge: true });

}

document.getElementById("googleSignIn")?.addEventListener("click", handleGoogleAuth);
document.getElementById("googleSignUp")?.addEventListener("click", handleGoogleAuth);
