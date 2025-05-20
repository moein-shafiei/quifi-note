import { Platform } from "react-native";
import { INotificationService } from "../Intermediate/INotificationService";
import { NotificationM } from "../Intermediate/Notification";
import { DeviceNotificationService } from "./deviceNotificationService";
import { WebNotificationService } from "./webNotificationService";

export class NotificationManger
{
    notificationService: INotificationService;
    responseListener: Promise<string> = Promise.resolve("");

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
        await this.notificationService.Initialize();

        this.responseListener = this.notificationService.SetupNotificationListener();

        this.responseListener.then(
            (response) =>
            {
                console.log("Notification response received2:", response);

                if (response == "know")
                {
                    console.log("User acknowledged the notification.");
                    this.Schedule(1000);
                }
            }
        ).catch(
            (error) =>
            {
                console.error("Error receiving notification response:", error);
            }
        );
    }

    async Schedule(intervalMs: number = 60000): Promise<void>
    {
        const notification: NotificationM = 
        {
            title: "Test Notification",
            textMessage: "This is a test notification",
            picture: "https://png.pngtree.com/png-vector/20221217/ourmid/pngtree-example-sample-grungy-stamp-vector-png-image_15560590.png",
            actions: [
                { action: 'know', title: '👍 Know' },
                { action: 'learning', title: '💬 Learning' },
            ]
        };

        //await this.notificationService.ScheduleNotif(notification, intervalMs);
        await this.notificationService.Send(notification);
    }

    async Send(): Promise<void>
    {
        await this.notificationService.Send({
            title: "Test Notification", 
            textMessage: "This is a test notification",
            picture: "https://png.pngtree.com/png-vector/20220315/ourmid/pngtree-sample-stamp-ink-sample-vector-png-image_16532122.png",
            actions: [
                { action: 'know', title: '👍 Know' },
                { action: 'learning', title: '💬 Learning' },
            ]
        });
    }
}