import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBwlGNbJegj4BxrLMdkE5YugRS0nfMcE48",
  authDomain: "fost---food-street.firebaseapp.com",
  projectId: "fost---food-street",
  storageBucket: "fost---food-street.appspot.com",
  messagingSenderId: "1036530834692",
  appId: "1:1036530834692:web:bf2dfcfb8fd3ab1f29c451",
  measurementId: "G-LYETE6N9P6"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
