import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersListMock } from 'src/app/data/users-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  usersList: IUser[] = [];
  //selectedUser: IUser = UsersListMock[0];
  selectedUser: IUser = { } as IUser;
  hasUser: boolean = false;

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      console.log('simulando cahamda HTTP para busca de usuários');
      this.usersList = UsersListMock;
    }, 3000)
  }

  handleUserSelected(user: IUser) {
    console.log('handleUserSelected()', user);
    this.hasUser = true;

    // Pego os dados do usuário selecionado pelo Emitir @Output
    // e passo pro @Input
    this.selectedUser = user;
  }
}
