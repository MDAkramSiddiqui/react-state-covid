function register() {
    if (window.navigator && navigator.serviceWorker) {
        navigator.serviceWorker
            .register('./sw.js', { scope: '/' })
            .then((reg) => console.log('Service Worker Registered!', reg))
            .catch((err) => console.error('Service worker error', err));
    }
}

function unregister() {
    if (window.navigator && navigator.serviceWorker) {
        navigator.serviceWorker
            .getRegistrations()
            .then((registrations) =>
                registrations.forEach((registration) =>
                    registration.unregister(),
                ),
            );
    }
}

module.exports = {
    register,
    unregister,
};
