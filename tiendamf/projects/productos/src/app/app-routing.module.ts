import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   //pagían por defecto, app component
  {path: '', pathMatch:'full', redirectTo:''},

  //ruta al módulo de perfil - lazy loading
  { path: 'productos', loadChildren: ()=> import('./productos/productos.module').then(m=> m.ProductosModule)},

  //ruta comodín
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
