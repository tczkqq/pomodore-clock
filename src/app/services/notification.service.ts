import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    Notification.requestPermission();
  }

  getPermission(): NotificationPermission {
    return Notification.permission;
  }

  sendNotification(title: string, options?: NotificationOptions): void {
    Notification.requestPermission(function (result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, options);
        });
      }
    });
  }
}
