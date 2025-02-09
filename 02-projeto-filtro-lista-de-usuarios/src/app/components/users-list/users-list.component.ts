import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListMock } from 'src/app/data/users-list';
import { IUser } from 'src/app/interfaces/user/user.interface';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  displayedColumns: string[] = ['name', 'date', 'status'];
  @Input() usersList: IUser[] = [];

  // Emitindo(enviando) o usuário selecionado
  @Output() userSelected = new EventEmitter<IUser>();

  constructor() { }

  onUserSelected(user: IUser) {
    console.log('onUserSelected()', user);

    // Emitindo(enviando) o evento com o usuário selecionado
    this.userSelected.emit(user);
  }
}
