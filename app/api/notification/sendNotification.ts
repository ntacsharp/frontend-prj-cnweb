export const sendNotification = (name: string, message: string) => {
    if (Notification.permission !== 'denied' && Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(name, {
                    body: message,
                });
            }
        });
    } else if (Notification.permission === 'granted') {
        new Notification(name, {
            body: message,
        });
    }

}