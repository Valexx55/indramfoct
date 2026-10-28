import { Injectable } from '@angular/core';
import { ProductoEvent } from '@models';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';


/** Este es el servicio que va a coumnicar las MicroApps de Carrito y Producto */
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //no funciona bien porque no puede escuchar hasta que no se suscribe (Ciclo de vida de componente)
  //productoAddedSubject = new Subject<ProductoEvent>();
  //mejora al anterior, pero el carrito sólo recupera el último evento antes de iniciar la suscripción
  //productoAddedSubject = new BehaviorSubject<ProductoEvent|null>(null);
  //mejora al anterior, teniendo una memoria de 2 o N
  //productoAddedSubject = new ReplaySubject<ProductoEvent>(2);
  //la solución mejor viene al mantener en estado del array de productoEvent
productoAddedSubject: BehaviorSubject<ProductoEvent[]>;

//lista mutable/reactiva de productos
producto$:Observable<ProductoEvent[]>;

  constructor() {

    console.log("Instanciando CommunicationService ", Math.random());
    this.productoAddedSubject=new BehaviorSubject<ProductoEvent[]>([]);
    this.producto$ = this.productoAddedSubject.asObservable();
   }

   emitirProductoAdded (productoEvent:ProductoEvent)
   {
    //this.productoAddedSubject.next(productoEvent);

    let listaActual = this.productoAddedSubject.value;

    let indice = listaActual.findIndex(p=> p.id == productoEvent.id);

    if (indice>-1)
    {
      //el producto estaba, actualizamos el contador de cantidad
      listaActual[indice].cantidad = (listaActual[indice].cantidad||1)+1
      this.productoAddedSubject.next([...listaActual]);//transmito una nueva copia de la lista actualizada (nueva referencia)
    } else {
      //producto nuevo
      //creamos un array nuevo, añadiendo el producto elegido
      this.productoAddedSubject.next([...listaActual, {...productoEvent,cantidad:1}]);
    }

   }

   vaciarProductos()
   {
    this.productoAddedSubject.next([]);
   }

}
