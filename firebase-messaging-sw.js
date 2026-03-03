// firebase-messaging-sw.js

// Import and initialize the Firebase app with the config.
// Ensure your firebaseConfig is accessible here, or passed in.
// For web apps, it's often best to have the config defined globally or imported.
// For this example, we'll assume 'firebaseConfig' is globally available or imported.

// IMPORTANT: In a real-world scenario, ensure firebaseConfig is properly loaded.
// For this setup, we'll define it here assuming it's the same as in your HTML.
// You might need to adjust how 'firebaseConfig' is accessed or defined.

// --- IMPORTANT: Define firebaseConfig here or ensure it's accessible globally ---
const firebaseConfig = {
  apiKey: "AIzaSyD2ZpkPF0EIT4uK0YULGgBvfU7kHeCml2Q",
  authDomain: "shuvidha-seva-32df0.firebaseapp.com",
  databaseURL: "https://shuvidha-seva-32df0-default-rtdb.firebaseio.com",
  projectId: "shuvidha-seva-32df0",
  storageBucket: "shuvidha-seva-32df0.firebasestorage.app",
  messagingSenderId: "508915247632", // This is your Sender ID
  appId: "1:508915247632:web:91c3df82b4eae3c750f895",
  measurementId: "G-MQ6BPYD4EP"
};
// --- END IMPORTANT ---


importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js'); // Use compat version for SW
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging.getMessaging(app);

// Handler for messages received when the app is in the foreground
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image // Or a default icon
  };
  // You can display a custom notification here using the Notification API
  // Note: This will only show if the browser supports Notifications and the user has granted permission.
  // For more control, consider using a notification library or a more robust approach.
  // For simplicity, we'll log it and rely on the browser's default if it's a notification payload.

  // If you have a 'notification' field in the payload, the browser might handle it automatically.
  // If it's a data message, you might want to trigger UI updates or show custom notifications.
});

// Handler for messages received when the app is in the background or closed
// This handler is only invoked when the service worker is active and receives a message.
messaging.setBackgroundMessageHandler((payload) => {
  console.log('Background Message received. ', payload);

  // IMPORTANT: For background messages, you typically don't directly show UI.
  // The browser will display a notification if the payload contains a `notification` object.
  // You can customize the notification payload here for better presentation.
  // The `notification` property in the payload can contain `title`, `body`, and `icon`.
  
  // Example of how to customize the notification for background messages:
  // const notification = payload.notification;
  // if (notification) {
  //   return self.registration.showNotification(notification.title, {
  //     body: notification.body,
  //     icon: notification.image || '/path/to/default/icon.png' // Provide a default icon if missing
  //   });
  // }
  
  // You can also use `data` payload for custom actions or to update cache if needed,
  // but showing UI directly from SW is limited.
  
  // Returning a Promise is good practice for background handlers.
  return Promise.resolve();
});

// Function to request permission for notifications (if not already granted)
// This should typically be called from your main app script when the user allows it.
// Example:
// async function requestNotificationPermission() {
//   if (!messaging) {
//      console.error("Firebase Messaging not initialized.");
//      return;
//   }
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//       const token = await messaging.getToken();
//       console.log('FCM Token:', token);
//       // Send this token to your server/database to associate it with the user
//       // to send targeted messages later.
//     } else {
//       console.log('Notification permission denied.');
//     }
//   } catch (error) {
//     console.error('Error requesting notification permission:', error);
//   }
// }
//
// You would call this function from your main JavaScript, e.g., after user login.
