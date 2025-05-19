import { Platform } from "react-native";
import { INotificationService } from "../Intermediate/INotificationService";
import { NotificationM } from "../Intermediate/Notification";
import { DeviceNotificationService } from "./deviceNotificationService";
import { WebNotificationService } from "./webNotificationService";

export class NotificationManger
{
    notificationService: INotificationService;

    constructor()
    {
        if (Platform.OS == "web")
        {
            this.notificationService = new WebNotificationService();
        } else
        {
            this.notificationService = new DeviceNotificationService();
        }
    }

    async Initialize(): Promise<void>
    {
        this.notificationService.Initialize();
    }

    async Schedule(intervalMs: number = 60000): Promise<void>
    {
        const notification: NotificationM = {
            title: "Test Notification",
            textMessage: "This is a test notification",
            picture: "https://example.com/image.png",
            actions: [
                { action: 'know', title: '👍 Know' },
                { action: 'learning', title: '💬 Learning' },
            ]
        };

        await this.notificationService.ScheduleNotif(notification, intervalMs);
    }

    async Send(): Promise<void>
    {
        await this.notificationService.Send({
            title: "Test Notification", 
            textMessage: "This is a test notification",
            picture: "https://example.com/image.png",
            actions: [
                { action: 'know', title: '👍 Know' },
                { action: 'learning', title: '💬 Learning' },
            ]
        });
    }
}