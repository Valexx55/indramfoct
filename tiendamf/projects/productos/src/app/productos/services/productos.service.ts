import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos = [
    {id:1, nombre:'Teclado', precio:45},
    {id:2, nombre:'Monitor', precio:120},
    {id:3, nombre:'Ratón', precio:20},
  ]


    private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private httpClient:HttpClient) { }

  //versión local
 /* getProductos ()
  {
    return this.productos;
  }*/

  //versión remota
  getProductos():Observable<Producto[]>
  {
    return this.httpClient.get<Producto[]>(this.apiUrl);
  }
}
