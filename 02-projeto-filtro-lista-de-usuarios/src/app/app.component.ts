import { Component, OnInit } from '@angular/core';
import { filterUsersList } from './utils/filter-users-list';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  usersList$: Observable<IUser[]> = new Observable<IUser[]>();
  usersListFiltered$: Observable<IUser[]> = new Observable<IUser[]>();
  
  selectedUser: IUser = { } as IUser;
  hasUser: boolean = false;

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      console.log('simulando cahamda HTTP para busca de usuários');
      this.usersList$ = of(UsersListMock); // Lista original como Observable
      this.usersListFiltered$ = this.usersList$; // Lista filtrada também como Observable
    }, 2000)
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
    
    // Aplicando o filtro usando operadores do RxJS
    this.usersListFiltered$ = this.usersList$.pipe(
      map(usersList => filterUsersList(filterOptions, usersList))
    );
  }

}
