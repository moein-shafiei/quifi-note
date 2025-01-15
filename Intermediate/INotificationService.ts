import { NotificationM } from "./Notification";

export interface INotificationService
{
    Send(Notification: NotificationM): Promise<void>;

    IsSupported(): Promise<boolean>;
    Initialize(): Promise<void>;
}