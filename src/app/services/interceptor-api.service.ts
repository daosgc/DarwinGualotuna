import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorApiService  implements HttpInterceptor {
  private readonly authorId = '1';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona la solicitud y modifica lo que necesites aquí
    const modifiedReq = req.clone({
      headers: req.headers.set('authorId', this.authorId)
    });

    // Envía la solicitud modificada
    return next.handle(modifiedReq);
  }
}
