import { Component, OnInit } from '@angular/core';
import { INavItem } from '../interfaces/navigation';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent implements OnInit {
 
 activeNav: INavItem | undefined;
 routes: INavItem[] = [];
  constructor(private navService: NavService){ }
  ngOnInit(): void {
    this.routes = this.navService.routes;
    this.navService.navSubject$.subscribe(nav => this.activeNav = nav);
  }

  nav(navItem: INavItem) {
    this.navService.navTo(navItem);
  }
}
