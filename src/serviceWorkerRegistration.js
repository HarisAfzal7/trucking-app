// This file handles the registration of the service worker to enable PWA features.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname === '127.0.0.1'
  );
  
  export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // In production, register the service worker
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // If the app is served from a different origin, we cannot register the service worker
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // If on localhost, check for service worker updates
          checkValidServiceWorker(swUrl);
        } else {
          // If not localhost, just register the service worker
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed: ', error);
      });
  }
  
  function checkValidServiceWorker(swUrl) {
    // Check if the service worker can be found. If it can't, reload the page
    fetch(swUrl)
      .then((response) => {
        // Ensure the service worker exists and is a valid file
        if (
          response.status === 404 ||
          response.headers.get('content-type').indexOf('javascript') === -1
        ) {
          // Service worker not found or invalid JS, so skip the registration
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker found and valid, register it
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log(
          'No internet connection found. App is running in offline mode.'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  