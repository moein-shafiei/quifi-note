self.addEventListener('push', (event) =>
{
    const data = event.data.json();
    const title = data.title || 'Notification';
    const options = {
        body: data.body || 'No content',
        icon: data.icon || '/default-icon.png',
        actions: data.actions || [], // Buttons
        data: data.customData || {}, // Custom data to handle actions
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Handle notification button clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification

    let actionHandled = false;
    if (event.action) {
        // Handle button actions
        switch (event.action) 
        {
            case 'know':
                console.log('User clicked "Know"');
                actionHandled = true;
                break;
            case 'learning':
                console.log('User clicked "Learning"');
                actionHandled = true;
                break;
            default:
                console.log('User clicked an unknown action:', event.action);
        }
    } else {
        // Handle the notification click itself
        console.log('User clicked the notification');
    }

    // Optionally, post a message to all clients (open tabs)
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients) {
            for (const client of clients) {
                client.postMessage({
                    type: 'notification-action',
                    action: event.action || 'notification',
                    handled: actionHandled
                });
            }
        })
    );
});
