import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingState: BehaviorSubject<boolean>;
  public isLoading$!: Observable<boolean>;
  constructor() {
    this.loadingState = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.loadingState.asObservable();
  }
  setLoading(loading: boolean) {
    this.loadingState.next(loading);
  }
}
