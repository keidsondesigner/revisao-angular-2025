import { Component, ErrorHandler, Injectable } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ModalService } from './app/services/modal.service';
import { ModalContainerComponent } from './app/components/modal-container.component';
import { FeedbackModalComponent } from './app/components/feedback-modal.component';
import { UserListModalComponent } from './app/components/user-list-modal.component';
import { BrowserInfoModalComponent } from './app/components/browser-info-modal.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('An error occurred:', error);
    // You could add more sophisticated error handling here, like sending to a logging service
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModalContainerComponent],
  template: `
    <h1>Exemplo de Modais em Angular</h1>
    <button (click)="openFeedbackModal()">Abrir Modal de Feedback</button>
    <button (click)="openUserListModal()">Abrir Modal de Lista de Usuários</button>
    <button (click)="openBrowserInfoModal()">Abrir Modal de Informações do Navegador</button>
    <app-modal-container></app-modal-container>
  `,
})
export class App {
  constructor(private modalService: ModalService) {}

  openFeedbackModal() {
    this.modalService.openModal({ component: FeedbackModalComponent });
  }

  openUserListModal() {
    this.modalService.openModal({ component: UserListModalComponent });
  }

  openBrowserInfoModal() {
    this.modalService.openModal({ component: BrowserInfoModalComponent });
  }
}

bootstrapApplication(App, {
  providers: [
    ModalService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
}).catch(err => console.error(err));