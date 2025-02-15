import { Component, OnInit } from '@angular/core';
import { filterUsersList } from './utils/filter-users-list';

import { IUser } from './interfaces/user/user.interface';
import { UsersListMock } from 'src/app/data/users-list';

interface IFilterOptions {
  name: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: boolean | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  usersList: IUser[] = [];
  usersListFiltered: IUser[] = []; // lista filtrada
  
  selectedUser: IUser = { } as IUser;
  hasUser: boolean = false;

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      console.log('simulando cahamda HTTP para busca de usuários');
      this.usersList = UsersListMock; // Lista original 
      this.usersListFiltered = this.usersList; // Lista filtrada
    }, 3000)
  }

  handleUserSelected(user: IUser) {
    console.log('handleUserSelected()', user);
    this.hasUser = true;

    // Pego os dados do usuário selecionado pelo Emitir @Output
    // e passo pro @Input
    this.selectedUser = user;
  }

  handleFilterApplied(filterOptions: IFilterOptions) {
    // Pego os dados do filtro pelo $event do Emitir @Output
    console.log('handleFilterApplied()', filterOptions);

    // Filtrando a lista original
    this.usersListFiltered = filterUsersList(filterOptions, this.usersList);
  }

}
