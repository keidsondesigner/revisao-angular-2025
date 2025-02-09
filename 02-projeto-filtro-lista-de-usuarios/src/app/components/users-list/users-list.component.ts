import { Component } from '@angular/core';
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

  onUserSelected(user: IUser) {
    console.log(user);
  }
}
