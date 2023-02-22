import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { app } from "./firebase";
const reCAPTCHA_PUBLIC_KEY = "6LdKKY4kAAAAAAh_e7RouLEk9jNNixfAbQ1yTvl3";
export const startAppCheck = () => initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(reCAPTCHA_PUBLIC_KEY),
    isTokenAutoRefreshEnabled: true,
});