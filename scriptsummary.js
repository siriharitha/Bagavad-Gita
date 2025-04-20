import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDsyCpmaVxf4ryXzTHLx5nAZMwDPNvHfss",
  authDomain: "bagavad-gita-bb71a.firebaseapp.com",
  databaseURL: "https://bagavad-gita-bb71a-default-rtdb.firebaseio.com",
  projectId: "bagavad-gita-bb71a",
  storageBucket: "bagavad-gita-bb71a.firebasestorage.app",
  messagingSenderId: "525837464519",
  appId: "1:525837464519:web:f9c5a7450d2f6cbdc5dfe2",
  measurementId: "G-V74GQ2ZZ2N"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
window.changeText = function (languageKey) {
    fetchTranslations(window.summary, languageKey);
  }
  window.navClick = async function (summary) {
    window.summary = summary; // Update current shloka number
    const mainRef = ref(`database, summary-${summary}/main`);
    try {
        const snapshotMain = await get(mainRef);
     if (snapshotMain.exists()) {
            document.getElementById("summary-box").innerHTML = snapshotMain.val();
          } else {
            console.log(`No main text found for Shloka-${shlokaNumber}.`);
            document.getElementById("shloka-box").innerHTML = "Shloka text not available.";
          }
}
catch (error) {
    console.error(`Error fetching data for Shloka-${shlokaNumber}:, error`);
  }
};

function fetchTranslations(summary=window.summary, languageKey) {
    const transRef = ref(database, `summary/translate/${languageKey}`);
    
    get(transRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          document.getElementById("summary-box").innerHTML = snapshot.val();
        } else {
          console.log(`No translation found for Shloka-${shlokaNum} in ${languageKey}.`);
          document.getElementById("shloka-box").innerHTML = "Translation not available.";
        }
      })
      .catch((error) => {
        console.error(`Error fetching translation for Shloka-${shlokaNum} in ${languageKey}:`, error);
      });
  }
  function goBack() {
    window.location.href = 'front.html'; // Replace with your actual main page URL
  }
  window.changeText = function (languageKey) {
    fetchTranslations(window.summary, languageKey);
  }
  window.navClick = async function (summary) {
    window.summary = summary; // Update current shloka number
    const mainRef = ref(`database, summary-${summary}/main`);
    try {
        const snapshotMain = await get(mainRef);
     if (snapshotMain.exists()) {
            document.getElementById("summary-box").innerHTML = snapshotMain.val();
          } else {
            console.log(`No main text found for Shloka-${shlokaNumber}.`);
            document.getElementById("shloka-box").innerHTML = "Shloka text not available.";
          }
}
catch (error) {
    console.error(`Error fetching data for Shloka-${shlokaNumber}:, error`);
  }
};