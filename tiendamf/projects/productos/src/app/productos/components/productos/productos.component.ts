import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { CommunicationService } from '@core-lib';
import { ProductoEvent } from '@models';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
 

  private productoService = inject(ProductosService);
  communicationService = inject(CommunicationService);

  productos: Producto[] = [];

 ngOnInit(): void {
  //versión local
    this.productos = this.productoService.getProductos();
  }

  agregarAlCarrito(p:Producto)
  {
    console.log(`Producto cargado ${p}`);
    console.log("Producto cargado", p);

    let evento: ProductoEvent = {
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad:1
    }

    this.communicationService.emitirProductoAdded(evento);
  }



}
