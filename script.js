//   ----------------------/Database Integration/-----------------------
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//-------------------------------/Fetching Data/-------------------------------
async function fetchTranslation(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,`shloka-${shlokaNum}/Translations/${languageKey}`);
  const meaningRef1 = ref(database, `shloka-${shlokaNum}/meaning/${languageKey}`);
  const snapshot3 =await get(meaningRef1);
  if (snapshot3.exists()) {
    const meaningText1 = snapshot3.val();
    document.getElementById("meaning-box").innerHTML =`${meaningText1}`;
  } else {
    console.error("No text data found.");
  }
  get(tranRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("shloka-box").innerHTML = snapshot.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}
//----------------------/Database Integration End/-----------------------

window.changeText = function(languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};


//-----------------------------/Onclick functions/-----------------------------
window.navClick = async function(shlokaNumber) {
  window.currentShlokaNum = shlokaNumber;
  const mainRef = ref(database, `shloka-${shlokaNumber}/main`);  
  const meaningRef = ref(database, `shloka-${shlokaNumber}/meaning/2`);
 const audioRef = ref(database, `shloka-${shlokaNumber}/audio`);
 const audio1Ref = ref(database, `shloka-${shlokaNumber}/audiom`);
 const audio2Ref = ref(database, `shloka-${shlokaNumber}/audioc`);
 const wordtowordRef = ref(database, `shloka-${shlokaNumber}/wordtoword`);
  const snapshot = await get(audioRef);
  const snapshot1 = await get(mainRef);  
  const snapshot2 = await get(meaningRef);
  const snapshot4 = await get(audio1Ref);
  const snapshot5 = await get(audio2Ref);
  const snapshot3 = await get(wordtowordRef);
if (snapshot.exists()) {
    const audioUrl = snapshot.val();
    document.getElementById("audPlayer").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot1.exists()) {
    const mainText = snapshot1.val();
    document.getElementById("shloka-box").innerHTML = mainText;
  } else {
    console.error("No text data found.");
  }
  if (snapshot2.exists()) {
    const meaningText = snapshot2.val();
    document.getElementById("meaning-box").innerHTML =`Meaning:${meaningText}`;
  } else {
    console.error("No text data found.");
  }
  if (snapshot4.exists()) {
    const audioUrl = snapshot4.val();
    document.getElementById("audPlayer1").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot5.exists()) {
    const audioUrl = snapshot4.val();
    document.getElementById("audPlayer1").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
};






window.showImage = function () {
  const shlokaNumber = window.currentShlokaNum || 1; // Default to 1 if not set
  console.log(`showImage called for Shloka Number: ${shlokaNumber}`); // Debugging

  // Map of Shloka numbers to image URLs
  const imageMap = {
    1: " ./images/shloka-1.jpg",
    2: " ./images/shloka-2.jpg",
    3: " ./images/shloka-3.jpg",
    4: " ./images/shloka-4.jpg",
    5: " ./images/shloka-5.jpg",
    6: " ./images/shloka-6.jpg",
    7: " ./images/shloka-7.jpg",
    8: " ./images/shloka-8.jpg",
    9: " ./images/shloka-9.jpg",
    10: " ./images/shloka-10.jpg",


  };

  // Get the image URL based on the Shloka number
  const imageURL = imageMap[shlokaNumber];

  // DOM elements for displaying the image
  const imageContainer = document.getElementById("imageContainer");
  const displayedImage = document.getElementById("displayedImage");

  if (imageURL) {
    console.log(`Displaying image for Shloka ${shlokaNumber}: ${imageURL}`); // Debugging
    displayedImage.src = imageURL;
    imageContainer.style.display = "block"; // Make the image container visible
  } else {
    console.error(`Image for Shloka ${shlokaNumber} not found.`);
    imageContainer.style.display = "none"; // Hide the container if no image is found
  }
};