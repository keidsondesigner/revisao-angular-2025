import { Component, OnInit } from '@angular/core';
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
    this.usersListFiltered = this.filterUsersList(filterOptions, this.usersList);
  }

  filterUsersList(filterOptions: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[] = [];

    filteredList = this.filterUsersListByName(filterOptions.name, usersList);

    return filteredList;
  }

  filterUsersListByName(name: string, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPPED = name === undefined;

    // Se o nome não foi digitado, retorna a lista original;
    if (NAME_NOT_TYPPED) {
      return usersList;
    }

    // Se o nome foi digitado, 
    // Vou percorrer a lista de usuários
    // e acesso a propriedade "nome" de cada objeto "usuário"
    // verifico em cada objeto a propriedade "usuário.nome", possui(include) o nome digitado
    const filteredList = usersList.filter(user => user.nome.toLowerCase().includes(name.toLowerCase()));

    // retorna a lista filtrada;
    return filteredList;
  }
}
