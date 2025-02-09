import { Component } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersListMock } from 'src/app/data/users-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedUser: IUser = UsersListMock[0];
}
