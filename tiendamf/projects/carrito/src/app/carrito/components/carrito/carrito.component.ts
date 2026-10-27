import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommunicationService } from '@core-lib';
import { ProductoEvent } from '@models';
import { Subscription } from 'rxjs';

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

  //ya no me tengo que suscribir
  //ya no me tengo que desuscribir
  //y para mostrar la lista actualizada en la plantilla, usamos |async
  productos$ = this.communicationService.producto$;

  ngOnInit(): void {
    this.cargarCarrito();

    this.sub = this.communicationService.productoAddedSubject.subscribe(
      (evento:ProductoEvent[])=> {
        //console.log("Producto rx ", evento);
        console.table(evento);
        this.carrito = evento;
      }
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
    this.carritoService.vaciarCarrito();
    this.cargarCarrito();
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
