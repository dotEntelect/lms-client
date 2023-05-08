import { Injectable } from '@angular/core';
import { ILoggedInUserState, IUserModel } from '../interfaces/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private currentUser: BehaviorSubject<IUserModel | null>;
  public userSubject$!: Observable<IUserModel | null>;
  constructor() {
    this.currentUser = new BehaviorSubject<IUserModel | null>(null);
    this.userSubject$ = this.currentUser.asObservable();
  }
  userLoggedOut() {
    localStorage.removeItem('x-user');
    this.currentUser.next(null);
  }
  getUserToken(): string {
    const loggedInUser = localStorage.getItem('x-user');
    if (loggedInUser) {
      return JSON.parse(loggedInUser).token;
    }
    return '';
  }
  setLoggedInUser(user: ILoggedInUserState){
      this.currentUser.next(user.userDetails);
      localStorage.setItem('x-user', JSON.stringify(user));
  }
  getUserFromLocalStorage() {
    const loggedInUser = localStorage.getItem('x-user');
    if (loggedInUser) {
        this.setLoggedInUser(JSON.parse(loggedInUser));
    } else {
      this.currentUser.next(null);
      this.userLoggedOut();
    };
  }
  isUserLoggedIn() {
    return !!this.currentUser.value;
  }
}
