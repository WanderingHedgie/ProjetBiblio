import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  if(req.url.endsWith('/auth')) {
    return next(req);
  }

  const request = req.clone({
    setHeaders: {
      'Authorization' :  `Bearer ${authService.token}`,
    }
  });
  return next(request);
};
