import { BaseBloc, Bindable } from "bindable-bloc";

interface INotification {
    message: string,
    variant: "error" | "warning" | "info" | "success"
}

export default class NotificationBloc extends BaseBloc {
    
    readonly lastNotification = new Bindable<INotification | null>(null);

    add = (notification: INotification) => {
        this.lastNotification.value = notification;
    };

    addError = (error: string) => {
        this.add({
            message: error,
            variant: "error",
        });
    };
}