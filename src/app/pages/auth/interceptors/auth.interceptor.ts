import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.headers.get('skipAuthCheck') === 'true') {
      return next.handle(request);
    }
    
    const token = this.authService.getToken();

    if (!token || !this.isTokenValid(token)) {
      this.authService.logout();
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request);
  }

  private isTokenValid(token: string): boolean {

    if (!token) {
      return false;
    }

    const tokenParts = token.split('.');

    if (tokenParts.length !== 3) {
      return false;
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload || !payload.exp) {
      return false;
    }
    const expirationTime = payload.exp * 1000;
    return expirationTime > Date.now();
  }
}
