import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) > -1) {

        // if 401 : unathorized or 403: forbidden then logout
        this.authenticationService.logout();
        location.reload(true);
      }

      const error = err.error.message || err.error.statusText;
      return throwError(error);
    }));

  }
}
