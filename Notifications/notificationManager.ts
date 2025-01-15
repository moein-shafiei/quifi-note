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

    async Send(notification: NotificationM): Promise<void>
    {
        this.notificationService.Send(notification);
    }
}