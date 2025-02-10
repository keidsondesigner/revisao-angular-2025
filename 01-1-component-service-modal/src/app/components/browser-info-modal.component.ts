import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-browser-info-modal',
  template: `
    <div class="modal">
      <h2>Informações do Navegador</h2>
      <p>User Agent: {{ userAgent }}</p>
      <p>Plataforma: {{ platform }}</p>
      <button (click)="close()">Fechar</button>
    </div>
  `,
  standalone: true
})
export class BrowserInfoModalComponent {
  userAgent = navigator.userAgent;
  platform = navigator.platform;

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.closeModal();
  }
}