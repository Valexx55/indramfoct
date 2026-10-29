//definimos las funciones de suscripción para leer desde los Componentes/IU

import { CartState } from "@core-lib";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCartState = createFeatureSelector<CartState>('carrito');//este parámetro 'carrito' hace de id. Identifica nuestro slice o sección del Store


export const selectProductos = createSelector(
    selectCartState, //el slice/dominio de nuestro proceso
    (state)=> {
        console.log(" en selectProductos");
       return state.productos;
     } //los datos que yo extraigo de ese dominio/ consulta
)

//SOLUCIÓN DAVID

export const selectTotalProductos = createSelector(
    selectCartState,
    (state) => {
         console.log(" en selectTotalProductos");
        return state.productos.reduce((total, producto) => total + (producto.cantidad || 1), 0);
    }
);

export const selectImporteTotal = createSelector(
    selectCartState,
    (state) => {
        console.count('2. selectImporteTotal');
        console.log(" en selectImporteTotal");
        return state.productos.reduce((total, producto) => total + (producto.cantidad || 1) * (producto.precio || 0), 0);
    }
);

//BENJA: Al ser el total un dato derivado del selector de productos, es más óptimo calcularlo a partir de él
//EL VALOR DEL PRIMER PARÁMETRO ESTÁ MEMORIZADO. Si no cambia, no salta.
//Tiene memorizado el la referencia anterior, 
// ejecuta la consulta de selectProductos y como devuelve la misma referencia de ese array, 
// no ejecuta la función del selector (2º parámetro)
export const selectTotalImporteDerivado = createSelector(
  selectProductos,
  productos => {
    console.count('3. selectTotalImporteDerivado');
    console.log(" en selectTotalImporteDerivado");
    return productos.reduce(
    (total, p) => total + p.precio * (p.cantidad || 1),
    0
  )
}
);
