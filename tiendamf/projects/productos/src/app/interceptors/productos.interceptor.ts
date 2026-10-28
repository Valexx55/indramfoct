import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../productos/models/producto.model';

@Injectable()
export class ProductosInterceptor implements HttpInterceptor {

  constructor() {}

  //interceptar la respuesta del api de productos para adaptar el JSON recibido a nuestro modelo
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('fakestoreapi.com/products'))
    {
      return next.handle(request).pipe(
        map (event => {
          if (event instanceof HttpResponse && Array.isArray(event.body))
          {
            let productos: Producto[] = event.body.map((item:any) => ({
              id: item.id,
              nombre: item.title,
              precio: Number(item.price),
              imagen: item.image
            }));
            return event.clone({body:productos});//devuelvo el cuerpo modificado, con mi lista de productos adaptada
          }
          return event;
        })
      )
    }
    return next.handle(request);
  }
}
