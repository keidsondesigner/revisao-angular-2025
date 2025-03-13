import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastNotification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: ToastPosition;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<ToastNotification>();
  notifications$ = this.notificationSubject.asObservable();

  show(notification: ToastNotification) {
    this.notificationSubject.next({
      duration: 3000,
      position: 'top-right',
      ...notification
    });
  }

  success(message: string, duration?: number, position?: ToastPosition) {
    this.show({ message, type: 'success', duration, position });
  }

  error(message: string, duration?: number, position?: ToastPosition) {
    this.show({ message, type: 'error', duration, position });
  }

  info(message: string, duration?: number, position?: ToastPosition) {
    this.show({ message, type: 'info', duration, position });
  }

  warning(message: string, duration?: number, position?: ToastPosition) {
    this.show({ message, type: 'warning', duration, position });
  }
}