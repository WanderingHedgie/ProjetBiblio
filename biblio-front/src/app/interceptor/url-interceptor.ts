import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    url: `http://localhost:8080/api${ req.url }`
  });
  
  return next(request);
};
