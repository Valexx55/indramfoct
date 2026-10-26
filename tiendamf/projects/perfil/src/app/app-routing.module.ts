import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //pagían por defecto, app component
  {path: '', pathMatch:'full', redirectTo:''},

  //ruta al módulo de perfil - lazy loading
  { path: 'perfil', loadChildren: ()=> import('./perfil/perfil.module').then(m=> m.PerfilModule)},

  //ruta comodín
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
