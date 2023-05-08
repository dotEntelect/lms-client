import { Injectable } from '@angular/core';
import { INavItem } from '../interfaces/navigation';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  routes: INavItem[] = [
    { txt: 'Dashboard', link: 'dashboard', icon: 'x-dashboard' },
    { txt: 'Courses', link: 'courses', icon: 'x-courses' },
    { txt: 'Chats', link: 'chats', icon: 'x-chats' },
    { txt: 'Grades', link: 'grades', icon: 'x-grades' },
    { txt: 'Schedule', link: 'schedule', icon: 'x-schedule' },
    { txt: 'Settings', link: 'settings', icon: 'x-settings' },
    { txt: 'Logout', link: 'login', icon: 'x-login' },
  ];
  private currentNav: BehaviorSubject<INavItem>;
  public navSubject$!: Observable<INavItem>;
  constructor(private router: Router, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.registerIcons();
    this.currentNav = new BehaviorSubject<INavItem>(this.routes[0]);
    this.navSubject$ = this.currentNav.asObservable();
  }

  navTo(to: INavItem) {
    this.router.navigate([to.link]).then(() => this.setCurrentNav(to));
  }

  setCurrentNav(navItem: INavItem) {
    this.currentNav.next(navItem);
    localStorage.setItem('x-current-nav', JSON.stringify(navItem));
  }
  getCurrentNavFromLocalStorage() {
    const nav = localStorage.getItem('x-current-nav');
    if (nav) {
      this.navTo(JSON.parse(nav) as INavItem);
    }
  }
  registerIcons() {
    this.iconRegistry.addSvgIcon('x-dashboard', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/dashboard.svg'));
    this.iconRegistry.addSvgIcon('x-courses', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/courses.svg'));
    this.iconRegistry.addSvgIcon('x-chats', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/chats.svg'));
    this.iconRegistry.addSvgIcon('x-grades', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/grades.svg'));
    this.iconRegistry.addSvgIcon('x-settings', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/settings.svg'));
    this.iconRegistry.addSvgIcon('x-schedule', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/schedule.svg'));
    this.iconRegistry.addSvgIcon('x-login', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/login.svg'));
    this.iconRegistry.addSvgIcon('x-logout', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/logout.svg'));
  }
}
