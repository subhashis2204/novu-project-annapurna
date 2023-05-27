import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getMessaging, getToken, isSupported } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyAP4_vdF-y8Gw0UkTCQa4KR5xma9LcsTiQ",
    authDomain: "project-annapurna-d3a35.firebaseapp.com",
    projectId: "project-annapurna-d3a35",
    storageBucket: "project-annapurna-d3a35.appspot.com",
    messagingSenderId: "565344971199",
    appId: "1:565344971199:web:2b10ff335a17914909d90a",
    measurementId: "G-B0R2XBZNMZ"
};

const app = initializeApp(firebaseConfig);
const messaging = async() => await isSupported() && getMessaging(app);
const VAPID_KEY = 'BBfDyX4asWZprC3DmTxW_CtyR900wGcpLF89HnrbFRiPlAil02DJD8LFJz9Uh7fT0LYecRCFlzTupwyPDY5ATQ8';

const getFcmToken = async() => {
    try {
        const msg = await messaging()
        const token = await getToken(msg, { vapidKey: VAPID_KEY })
        if (token) return token;

        const permission = await Notification.requestPermission()
        if (permission === 'granted')
            return await getToken(messaging, { vapidKey: VAPID_KEY })

    } catch (err) {
        throw new Error('Unable to get token')
    }
}
const handleTokenButtonClick = async() => {
    try {
        const fcmToken = await getFcmToken();
        console.log(fcmToken);

        await sendTokenToServer(fcmToken);
    } catch (err) {
        console.log(err);
    }
}


async function sendTokenToServer(fcmToken) {
    const baseURL = 'http://localhost:3000';
    const path = window.location.pathname + '/subscribe';

    try {
        const response = await axios.post(baseURL + path, { fcmToken });
        console.log(response);
    } catch (err) {
        throw err;
    }
}


const tokenButton = document.getElementById('sendFcmToken');
tokenButton.addEventListener('click', handleTokenButtonClick);