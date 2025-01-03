import { NotificationM } from "./Notification";

export interface INotificationService
{
    send(Notification: NotificationM): Promise<void>;

    isSupported(): Promise<boolean>;
}