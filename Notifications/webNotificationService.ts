import { INotificationService } from "../Intermediate/INotificationService";
import { NotificationM } from '../Intermediate/Notification';
import { Alert } from "react-native";

export class WebNotificationService implements INotificationService
{
    async isSupported(): Promise<boolean>
    {
        return 'Notification' in window;
    }

    async send(notification: NotificationM): Promise<void>
    {
        if (!await this.isSupported())
        {
            console.error("Web Notifications are not supported on this browser.");
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted')
        {
            // new Notification(notification.title, {
            //     body: notification.textMessage,
            //     data: notification.picture,
            // });
            const serviceWorkerRegistration = await navigator.serviceWorker.ready;

            await serviceWorkerRegistration.showNotification(notification.title, {
                body: notification.textMessage,
                icon: notification.picture,
                actions: [
                    { action: 'like', title: '👍 Like' },
                    { action: 'reply', title: '💬 Reply' },
                ]
            });
        } else
        {
            Alert.alert("Notification permission not granted.");
        }
    }
}
