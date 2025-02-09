import { Component, EventEmitter, Output } from '@angular/core';
import { UsersListMock } from 'src/app/data/users-list';
import { IUser } from 'src/app/interfaces/user/user.interface';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  displayedColumns: string[] = ['name', 'date', 'status'];
  usersList: IUser[] = UsersListMock;

  // Emitindo(enviando) o usuário selecionado
  @Output() userSelected = new EventEmitter<IUser>();

  constructor() { }

  onUserSelected(user: IUser) {
    console.log('onUserSelected()', user);

    // Emitindo(enviando) o evento com o usuário selecionado
    this.userSelected.emit(user);
  }
}
