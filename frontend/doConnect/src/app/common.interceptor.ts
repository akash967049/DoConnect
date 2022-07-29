import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { AuthRouteGaurd } from './shared/guards/auth.route.guards';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private authGuard: AuthRouteGaurd) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    
    /*request.clone({
      setHeaders: {Authorization}
    })*/

    if(this.authGuard.checklogin()){
        const Authorization = this.authService.userInfo.getValue();
        request = request.clone({
            setHeaders:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
                Authorization: Authorization
            }
        })
    }
    return next.handle(request);
  }
}
