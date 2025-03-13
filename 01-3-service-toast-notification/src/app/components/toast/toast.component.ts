import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService, ToastNotification } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" *ngIf="currentNotification" [ngClass]="currentNotification.position || 'top-right'">
      <div class="toast" [ngClass]="currentNotification.type">
        {{ currentNotification.message }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      z-index: 1000;
    }

    .toast-container.top-right {
      top: 20px;
      right: 20px;
    }

    .toast-container.top-left {
      top: 20px;
      left: 20px;
    }

    .toast-container.bottom-right {
      bottom: 20px;
      right: 20px;
    }

    .toast-container.bottom-left {
      bottom: 20px;
      left: 20px;
    }

    .toast-container.top-center {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast-container.bottom-center {
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast {
      padding: 15px 25px;
      border-radius: 4px;
      color: white;
      margin-bottom: 10px;
      min-width: 200px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .success {
      background-color: #4caf50;
    }

    .error {
      background-color: #f44336;
    }

    .info {
      background-color: #2196f3;
    }

    .warning {
      background-color: #ff9800;
    }
  `]
})
export class ToastComponent implements OnDestroy {
  currentNotification?: ToastNotification;
  private subscription: Subscription;
  private timeout?: any;

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.notifications$.subscribe(notification => {
      this.showNotification(notification);
    });
  }

  private showNotification(notification: ToastNotification) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.currentNotification = notification;
    
    this.timeout = setTimeout(() => {
      this.currentNotification = undefined;
    }, notification.duration || 3000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}