// firebase-messaging-sw.js
// Service Worker for Firebase Cloud Messaging
// This file must be placed in the root directory of your website

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyAc_yJQ_rkzuOBh-Yxg0Q4eooXtB-tQjm0",
    authDomain: "pingu-solar.firebaseapp.com",
    projectId: "pingu-solar",
    storageBucket: "pingu-solar.firebasestorage.app",
    messagingSenderId: "232764952866",
    appId: "1:232764952866:web:5923b7f419de6355d6157b",
    measurementId: "G-PFH059DZ64"
});

const messaging = firebase.messaging();

// Handle background messages (when app is not in focus)
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192x192.png', // You'll need to create this icon
        badge: '/badge-72x72.png',  // Optional: monochrome icon for Android
        tag: payload.data?.tag || 'pingu-notification',
        requireInteraction: true, // Notification stays until user interacts
        data: payload.data,
        actions: [
            {
                action: 'open',
                title: 'View Details'
            },
            {
                action: 'close',
                title: 'Dismiss'
            }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    
    event.notification.close();

    if (event.action === 'open' || !event.action) {
        // Open the app when notification is clicked
        event.waitUntil(
            clients.openWindow('/teamview_complete_with_notifications.html')
        );
    }
});
