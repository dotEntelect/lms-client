import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IUserModel } from 'src/app/interfaces/user.model';
import { ServerService } from 'src/app/services/server.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  userList: IUserModel[] = [];
  constructor(private serverService: ServerService, private usersService: UsersService){}
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
      this.usersService.usersSubject$.subscribe(x => this.userList = x);
      this.serverService.getUsers().subscribe();
  }

}
