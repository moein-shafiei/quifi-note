import { Alert } from "react-native";
import { INotificationService } from "../Intermediate/INotificationService";
import { NotificationM } from '../Intermediate/Notification';

export class WebNotificationService implements INotificationService
{
    async Initialize(): Promise<void>
    {
        return;
    }

    async IsSupported(): Promise<boolean>
    {
        return 'Notification' in window;
    }

    async Send(notification: NotificationM): Promise<void>
    {
        if (!await this.IsSupported())
        {
            console.error("Web Notifications are not supported on this browser.");
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted')
        {
            const serviceWorkerRegistration = await navigator.serviceWorker.ready;

            await serviceWorkerRegistration.showNotification(notification.title, {
                body: notification.textMessage,
                icon: notification.picture,
                image: notification.picture, // Add this line to include the picture in the notification
                actions: [
                    { action: 'know', title: '👍 Know' },
                    { action: 'learning', title: '💬 Learning' },
                ]
            });

        } else
        {
            Alert.alert("Notification permission not granted.");
        }
    }

    setupNotificationListener()
    {
        navigator.serviceWorker.addEventListener('notificationclick', (event) =>
        {
            if (!event.action)
            {
                // No action button was clicked, handle the notification click
                return;
            }

            switch (event.action)
            {
                case 'know':
                    console.log('User clicked "Know"');
                    // Handle the "Know" action
                    break;
                case 'learning':
                    console.log('User clicked "Learning"');
                    // Handle the "Learning" action
                    break;
                default:
                    console.log(`Unknown action clicked: ${ event.action }`);
                    break;
            }

            event.notification.close();
        });
    }
}
