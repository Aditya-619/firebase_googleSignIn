import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC1opFI4zcTYTemwcCAyl4j7r5KVniuIlI",
    authDomain: "backendtesting-cad28.firebaseapp.com",
    projectId: "backendtesting-cad28",
    storageBucket: "backendtesting-cad28.appspot.com",
    messagingSenderId: "394104713073",
    appId: "1:394104713073:web:8448a9b1111663c86c90d0",
    measurementId: "G-N24H787Z0F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();