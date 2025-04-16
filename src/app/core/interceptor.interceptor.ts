import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { env } from './environment';

export const interceptorApi: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  loader.isLoading.next(true);

  const request = req.clone({
    url: env.BASE_URL + req.url,
  });

  return next(request).pipe(
    finalize(() => loader.isLoading.next(false)),
    catchError((error) => {
      console.error('Erro no interceptor | ', error);
      return throwError(() => error);
    })
  );
};
