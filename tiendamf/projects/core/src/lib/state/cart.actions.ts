//identificamos cada una de las acciones que provocan un cambio
//en el estado de nuestro estado/negocio "carrito-productos"

import { ProductoEvent } from "@models";
import { createAction, props } from "@ngrx/store";

//3 acciones. addproducto, eliminarproducto, vaciarcarrito

export const agregarProducto = createAction('[Carrito] Agregar Producto', props<{producto:ProductoEvent}>());
export const eliminarProducto = createAction('[Carrito] Eliminar Producto', props<{id:number}>());
export const vaciarCarrito = createAction('[Carrito] Vaciar Carrito');