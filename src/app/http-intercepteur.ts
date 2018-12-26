import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Intercepte les requetes et met l'autorisation dans le header
 */
@Injectable()
export class HttpIntercepteur implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('authorization') || '';
    const changedReq = req.clone({headers: req.headers.set('authorization', token)});
    return next.handle(changedReq);
  }
}
