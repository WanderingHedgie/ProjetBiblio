import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  if(req.url.endsWith('/auth') || !authService.token) { //if (... || !authService.token) veut dire : « si je n’ai pas de token, j’envoie la requête sans en-tête, au lieu d’envoyer un en-tête vide »
    return next(req);
  }

  const request = req.clone({
    setHeaders: {
      'Authorization' :  `Bearer ${authService.token}`,
    }
  });
  return next(request);
};
