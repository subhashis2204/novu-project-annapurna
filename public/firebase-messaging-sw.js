importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyAP4_vdF-y8Gw0UkTCQa4KR5xma9LcsTiQ",
    authDomain: "project-annapurna-d3a35.firebaseapp.com",
    projectId: "project-annapurna-d3a35",
    storageBucket: "project-annapurna-d3a35.appspot.com",
    messagingSenderId: "565344971199",
    appId: "1:565344971199:web:2b10ff335a17914909d90a",
    measurementId: "G-B0R2XBZNMZ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
