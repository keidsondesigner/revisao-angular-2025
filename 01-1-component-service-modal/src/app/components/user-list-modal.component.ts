import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-user-list-modal',
  template: `
    <div class="modal">
      <h2>Lista de Usuários</h2>
      <ul>
        <li>Usuário 1</li>
        <li>Usuário 2</li>
        <li>Usuário 3</li>
      </ul>
      <button (click)="close()">Fechar</button>
    </div>
  `,
  standalone: true
})
export class UserListModalComponent {
  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.closeModal();
  }
}