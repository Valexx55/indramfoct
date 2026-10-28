import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommunicationService } from '@core-lib';
import { ProductoEvent } from '@models';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit, OnDestroy {
  carritoService = inject(CarritoService);

  communicationService = inject(CommunicationService);

  carrito: any[] = [];
  total = 0;
  sub!: Subscription;

//TODO: Haced que el importe total se muestre en el componente de carrito de forma actualizada 

  //ya no me tengo que suscribir
  //ya no me tengo que desuscribir
  //y para mostrar la lista actualizada en la plantilla, usamos |async
  productos$ = this.communicationService.producto$;
  total$!:Observable<number>;

  ngOnInit(): void {
    this.cargarCarrito();

    this.sub = this.communicationService.productoAddedSubject.subscribe(
      (productos:ProductoEvent[])=> {
        //console.log("Producto rx ", evento);
        console.table(productos);
        this.carrito = productos;
        this.total = productos.map(producto => (producto.cantidad ?? 0) * producto.precio).reduce((total, precioProducto)=> total+precioProducto,0);
      }
    )

     //opción rX
    this.total$ = this.productos$.pipe(
      map(
        productos => {
          return productos.reduce((acc,p) => acc + p.precio * (p.cantidad??1), 0)
        }
      )
    )
  }

  ngOnDestroy(): void {
    console.log('on Destroy Carrito Component');
    this.sub.unsubscribe();
  }

  cargarCarrito() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.getTotal();
  }

  vaciarCarrito () {
    /*this.carritoService.vaciarCarrito();
    this.cargarCarrito();*/
    this.communicationService.vaciarProductos();
  }

   /**
   * hacemos una mejora para que en caso de que cambie un elemento de 
   * la lista y haya que repintarlo no se repinten todos sino que se lo actualizo los alimentos que cambiaron realmente reutilizando el resto
   * @param _index 
   * @param item 
   * @returns 
   */
  trackById(_index:number, item:any):number
  {
    return item.id;
  }
}
