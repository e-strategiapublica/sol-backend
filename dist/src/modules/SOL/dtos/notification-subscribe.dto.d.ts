export declare abstract class PushNotificationTokenKeyDto {
    p256dh: string;
    auth: string;
}
export declare abstract class PushNotificationTokenRegisterDto {
    enpoint: string;
    expirationTime: string;
    keys: PushNotificationTokenKeyDto;
}
export declare abstract class NotificationSubscribeDto {
    token: string;
}
