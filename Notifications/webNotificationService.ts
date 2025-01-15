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
