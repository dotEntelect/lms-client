import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserModel } from '../interfaces/user.model';
import { Role } from '../constants/enums';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject: BehaviorSubject<IUserModel[]>;
  public usersSubject$: Observable<IUserModel[]>;
  
  constructor() {
    this.usersSubject = new BehaviorSubject<IUserModel[]>([]);
    this.usersSubject$ = this.usersSubject.asObservable();
  }
  setUsers(users: IUserModel[]): any {
    this.usersSubject.next(users);
  }
  
  getUsersRole(role: Role) {
    return this.usersSubject.value.filter((user) => user.role === role);
  }

}
