import { Component, OnInit } from '@angular/core';
import { NavService } from './services/nav.service';
import { FacadeService } from './services/facade.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'lms-client';
  loading = true;
  constructor(private navService: NavService, private facadeService: FacadeService, private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe((l: boolean) => this.loading = l);
    this.navService.getCurrentNavFromLocalStorage();
    this.facadeService.getUserFromLocalStorage();
    this.loaderService.setLoading(false);
  }
  
}
