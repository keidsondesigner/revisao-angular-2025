import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ToastComponent } from './app/components/toast/toast.component';
import { NotificationService } from './app/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastComponent],
  template: `
    <app-toast></app-toast>
    <div style="padding: 20px;">
      <h1>Toast Notification Demo</h1>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <button (click)="showSuccess()">Success</button>
        <button (click)="showError()">Error</button>
        <button (click)="showInfo()">Info</button>
        <button (click)="showWarning()">Warning</button>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button (click)="showAtPosition('top-right')">Top Right</button>
        <button (click)="showAtPosition('top-left')">Top Left</button>
        <button (click)="showAtPosition('bottom-right')">Bottom Right</button>
        <button (click)="showAtPosition('bottom-left')">Bottom Left</button>
        <button (click)="showAtPosition('top-center')">Top Center</button>
        <button (click)="showAtPosition('bottom-center')">Bottom Center</button>
      </div>
    </div>
  `,
  styles: [`
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    button:hover {
      opacity: 0.9;
    }
  `]
})
export class App {
  constructor(private notificationService: NotificationService) {}

  showSuccess() {
    this.notificationService.success('Operation completed successfully!');
  }

  showError() {
    this.notificationService.error('An error occurred!');
  }

  showInfo() {
    this.notificationService.info('Here is some information.');
  }

  showWarning() {
    this.notificationService.warning('Warning: Please be careful!');
  }

  showAtPosition(position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') {
    this.notificationService.info(`This notification appears at ${position}`, 3000, position);
  }
}

bootstrapApplication(App, {
  providers: [NotificationService]
});