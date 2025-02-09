import { Component } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersListMock } from 'src/app/data/users-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //selectedUser: IUser = UsersListMock[0];
  selectedUser: IUser = { } as IUser;

  handleUserSelected(user: IUser) {
    console.log('handleUserSelected()', user);

    // Pego os dados do usuário selecionado pelo Emitir @Output
    // e passo pro @Input
    this.selectedUser = user;
  }
}
