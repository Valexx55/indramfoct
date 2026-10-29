import { CommunicationService } from '@core-lib';
import { ProductoEvent } from '@models';
import { createReducer, on, props } from '@ngrx/store';
/*import {
  agregarProducto,
  cambiarObservaciones,
  eliminarProducto,
  vaciarCarrito,
} from './cart.actions';*/
 import * as Acciones from './cart.actions';
//aquí definimos las funciones que reaccionan a los eventos/actions
//y que realemente van a transformar el estado, produciendo un estado nuevo

//definimos el modelo del estado inicial y lo instanciamos

export interface CartState {
  productos: ProductoEvent[];
  observaciones: string;
}

export const initalState: CartState = {
  productos: CommunicationService.recuperarProductos(), // []
  observaciones: '',
};

//definimos el reducer, que es la función que responde a las acciones, transformando el estado en uno nuevo
export const cartReducer = createReducer(
  initalState,
  on(Acciones.agregarProducto, (state, { producto }) => {
    let existe = state.productos.find((p) => p.id == producto.id);

    //genero la nueva lista
    let productos = existe
      ? state.productos.map((p) =>
          p.id == producto.id ? { ...p, cantidad: (p.cantidad ?? 1) + 1 } : p,
        ) //sumo cantidad
      : [...state.productos, { ...producto, cantidad: 1 }]; //añado producto
    //devuelvo un nuevo ESTADO
    return { ...state, productos };
  }),
  on(Acciones.vaciarCarrito, (state) => ({ ...state, productos: [] })),
  on(Acciones.eliminarProducto, (state, { id }) => {
    //elimino el producto de la lista
    const productos = state.productos.filter((p) => p.id !== id);
    //retorno nuevo estado
    return { ...state, productos };
  }),

  on(Acciones.cambiarObservaciones, (state, { observaciones }) => ({
    ...state,
    observaciones,
  })),
);
