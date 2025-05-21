import { NotificationM } from "./Notification";

export interface INotificationService
{
    Send(Notification: NotificationM): Promise<void>;

    IsSupported(): Promise<boolean>;
    Initialize(): Promise<void>;
    SetupNotificationListener(onAction: (action: string) => void): void;
    ScheduleNotif(notification: NotificationM, intervalMs?: number): Promise<void>;
}