import { Injectable } from '@angular/core';
import { FacadeService } from '../services/facade.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavService } from '../services/nav.service';
import { login } from '../interfaces/navigation';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  token: string | undefined;
  omitCalls = ['auth', 'assets'];
  skipInterceptor = false;
  constructor(
    private navService: NavService,
    private facadeService: FacadeService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.skipInterceptor = false;
    this.omitCalls.forEach((api) => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });
    this.token = this.facadeService.getUserToken();
    if (this.token || this.skipInterceptor) {
      if (!this.skipInterceptor) {
        const tokenizedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.token),
        });
        return next.handle(tokenizedReq).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (event.status === 401) {
                this.facadeService.userLoggedOut();
                this.navService.navTo({ ...login });
              }
            }
            return event;
          })
        );
      }
    } else {
      this.facadeService.userLoggedOut();
      this.navService.navTo({ ...login });
    }
    return next.handle(req);
  }
}
