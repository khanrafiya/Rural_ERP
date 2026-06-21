importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA5zPJ6mzOxUNT-I473oKsXzi8Xob2W118",
  authDomain: "rural-erp-c0155.firebaseapp.com",
  projectId: "rural-erp-c0155",
  storageBucket: "rural-erp-c0155.firebasestorage.app",
  messagingSenderId: "534912651056",
  appId: "1:534912651056:web:f4561f7bc04c40691102f5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  
  const { title, body, icon } = payload.notification;
  
  self.registration.showNotification(title, {
    body: body,
    icon: icon || '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
  });
});