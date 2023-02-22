import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import 'firebase/app-check'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_API_AUTHDOMAIN,
    projectId: process.env.REACT_APP_API_PROJECTOD,
    storageBucket: process.env.REACT_APP_API_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_API_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_API_APPID,
};

const reCAPTCHA_PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY

const app = initializeApp(firebaseConfig)//.firebase.appCheck().activate(reCAPTCHA_PUBLIC_KEY);

export const startAppCheck = () => initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(reCAPTCHA_PUBLIC_KEY),
    isTokenAutoRefreshEnabled: true,
});

export const db = getFirestore(app);

export default app;