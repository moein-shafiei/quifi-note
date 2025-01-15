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
self.addEventListener('notificationclick', (event) =>
{
    event.notification.close(); // Close the notification

    if (event.action)
    {
        // Handle button actions
        switch (event.action)
        {
            case 'like':
                console.log('User clicked "like"');
                break;
            case 'reply':
                console.log('User clicked "reply"');
                break;
            default:
                console.log('User clicked an unknown action:', event.action);
        }
    } else
    {
        // Handle the notification click itself
        console.log('User clicked the notification');
    }
});
