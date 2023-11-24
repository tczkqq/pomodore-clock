import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  requestPermission(): void {
    Notification.requestPermission();
  }

  getPermission(): NotificationPermission {
    return Notification.permission;
  }

  sendNotification(title: string, options?: NotificationOptions): void {
    if (this.getPermission() === 'granted') {
      new Notification(title, options);
    }
  }
}
