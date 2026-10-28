import { inject, Injectable } from '@angular/core';
import { agregarProducto, eliminarProducto } from '@core-lib';
import { ProductoEvent } from '@models';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';


const STORAGE_KEY = "carrito_productos";
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

//inyectamos el Store
store:Store = inject(Store);

  constructor() {

    let listaProductosInicial = CommunicationService.recuperarProductos();

    console.log("Instanciando CommunicationService ", Math.random());
    //this.productoAddedSubject=new BehaviorSubject<ProductoEvent[]>([]);
    this.productoAddedSubject=new BehaviorSubject<ProductoEvent[]>(listaProductosInicial);
    this.producto$ = this.productoAddedSubject.asObservable();
   }

   static recuperarProductos ():ProductoEvent[]{
      let inicial : ProductoEvent[] = [];

      //si usara sessionStorage se guardarían temporalmente los datos en la misma PESTAÑA
        let guardado = localStorage.getItem(STORAGE_KEY);
        inicial = guardado ? JSON.parse(guardado) : [];

      return inicial;
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
    this.persistir();//guardo los cambios en memoria secundaria

    //lanzamos la acción
    this.store.dispatch(agregarProducto({producto:productoEvent}));

   }

   persistir ()
   {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productoAddedSubject.value));
   }

   vaciarProductos()
   {
    localStorage.removeItem(STORAGE_KEY);//vació la memoria del navegador
    this.productoAddedSubject.next([]);//vacío la ram
   }

  

   eliminarProducto(id:number)
   {
    //actualizamos BHS rxjs
    let listaActual = this.productoAddedSubject.value;
    let nuevaLista = listaActual.filter(p=> p.id !== id);
    this.productoAddedSubject.next(nuevaLista);

    //localstorage
    this.persistir();

    //actualizar el Store NGRX
    this.store.dispatch(eliminarProducto({id}));
   }

}
