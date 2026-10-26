import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
    {path: 'productos', loadChildren: () => import('productos/Module').then(m=>m.ProductosModule)},
    {path: 'carrito', loadChildren: () => import('carrito/Module').then(m=>m.CarritoModule)},
    {path: 'perfil', loadChildren: () => import('perfil/Module').then(m=>m.PerfilModule)},
    {path: '**', redirectTo: ''}//cargar la págian de inicio del shell app componente
  
];
//VOLVEMOS EN 10 Mins - 13:10 aprox
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
