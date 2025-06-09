import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('access_token');
  if (
    req.url.includes('/authentication/login') ||
    req.url.includes('/users/register')
  ) {
    return next(req);
  }

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
