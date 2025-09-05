// Production Push Notification Service Worker
console.log('🔄 Push notification service worker loaded');

// Handle push notification events
self.addEventListener('push', function(event) {
  console.log('📢 Push notification received:', event);
  
  if (!event.data) {
    console.warn('Push event received but no data');
    return;
  }

  try {
    const data = event.data.json();
    console.log('📱 Push notification data:', data);

    const options = {
      body: data.body || data.message,
      icon: data.icon || '/icon-192x192.png',
      badge: data.badge || '/badge-72x72.png',
      data: {
        url: data.url || '/',
        timestamp: Date.now(),
        ...data.data
      },
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
        .then(() => {
          console.log('✅ Notification displayed successfully');
        })
        .catch(error => {
          console.error('❌ Failed to show notification:', error);
        })
    );
  } catch (error) {
    console.error('❌ Error processing push event:', error);
  }
});

// Handle notification click events
self.addEventListener('notificationclick', function(event) {
  console.log('🖱️ Notification clicked:', event);
  
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data;
  
  if (action === 'dismiss') {
    return;
  }
  
  // Open the app or navigate to specific URL
  const urlToOpen = data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clientList) {
        // Check if app is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.postMessage({
              type: 'NOTIFICATION_CLICKED',
              url: urlToOpen,
              data: data
            });
            return client.focus();
          }
        }
        
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
      .catch(error => {
        console.error('❌ Error handling notification click:', error);
      })
  );
});

// Handle background sync for offline notifications
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-notification-sync') {
    console.log('🔄 Background sync for notifications triggered');
    // Handle any pending notifications when back online
  }
});

// Installation and activation
self.addEventListener('install', function(event) {
  console.log('🚀 Push notification service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('✅ Push notification service worker activated');
  event.waitUntil(clients.claim());
});