//definimos las funciones de suscripción para leer desde los Componentes/IU

import { CartState } from "@core-lib";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCartState = createFeatureSelector<CartState>('carrito');//este parámetro 'carrito' hace de id. Identifica nuestro slice o sección del Store


export const selectProductos = createSelector(
    selectCartState, //el slice/dominio de nuestro proceso
    (state)=> state.productos //los datos que yo extraigo de ese dominio/ consulta
)

//TODO: CREAR SELECTORES PARA EL TOTAL DE PRODCUTOS Y EL IMPORTE TOTAL