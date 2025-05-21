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
                actions: notification.actions,
            });

        } else
        {
            Alert.alert("Notification permission not granted.");
        }
    }

    async ScheduleNotif(notification: NotificationM, intervalMs: number = 60000): Promise<void> 
    {
        setTimeout(async () =>
        {
            await this.Send(notification);
        }, intervalMs);
    }

    SetupNotificationListener(onAction: (action: string) => void): void
    {
        if ('serviceWorker' in navigator) 
        {
            navigator.serviceWorker.addEventListener('message', (event) =>
            {
                if (event.data?.type === 'notification-action') 
                {
                    // Handle the action (event.data.action)
                    console.log('Notification action received:', event.data.action);
                    onAction(event.data.action);
                }
            });
        }
    }
}
