export interface PushNotificationSendInterface {
    readonly category: PushNotificationCategoryEnum;
    readonly title: string;
    readonly body: string;
    readonly link: string;
}
export declare enum PushNotificationCategoryEnum {
    institucional = "institucional",
    educacional = "educacional",
    awards = "awards",
    swap = "swap"
}
